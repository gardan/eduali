using System;
using System.Activities;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Infrastructure;
using Ilc.Infrastructure.Workflows;
using Ilc.Web.Filters.Response;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;
using Training = Ilc.Data.Models.Training;

namespace Ilc.Web.Services
{
    public class TrainingsService : Service
    {
        public ITrainingsService Trainings { get; set; }
        public IUow Uow { get; set; }
        public IOffersService Offers { get; set; }
        public IUsersService Users { get; set; }
        public IStudentsService Students { get; set; }

        [ModelWithStatusResponseFilter]
        public FilteredDataModel<TrainingModel> Get(FilterParametersTrainings request)
        {
            var ret = new FilteredDataModel<TrainingModel>();

            var results = Trainings.GetFilteredTrainings(request);
            ret.TotalDisplayRecords = results.TotalDisplayRecords;
            ret.TotalRecords = results.TotalRecords;
            ret.Data = results.Data.Select(r => new TrainingModel().InjectFrom<TrainingToWebModel>(r) as TrainingModel).ToList();

            return ret;
        }

        public HttpResult Get(UpdateTrainingModel request)
        {
            var trainingModel =
                new TrainingModel().InjectFrom<TrainingToWebModel>(Trainings.GetById(request.Id)) as TrainingModel;
            return new HttpResult(new[] { trainingModel })
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Post(CreateTrainingModel request)
        {
            var students = new List<Student>();

            foreach (var studentModel in request.Students)
            {
                var student = Students.GetByStudentId(studentModel.Id);
                students.Add(student);
            }
            var contacts = new List<ContactPerson>(request.Contacts.Select(c => Uow.Contacts.GetById(c.Id)));

            var sales = Uow.UserProfiles.GetById(request.WorkflowOwners.Sales);
            var administration = Uow.UserProfiles.GetById(request.WorkflowOwners.Administration);
            var coordinator = Uow.UserProfiles.GetById(request.WorkflowOwners.Coordinator);
            var trainer = Uow.Trainers.GetById(request.TrainerId);


            var ownersConfiguration = new TrainingOwnersConfiguration()
                {
                    SalesId = sales.Id,
                    AdministrationId = administration.Id,
                    CoordinatorId = coordinator.Id,
                    TrainerId = trainer.UserProfileId
                };

            var newTraining = new Training
                {
                    SubjectId = request.SubjectId,
                    DesiredStartDate = request.DesiredStartDate,
                    DesiredEndDate = request.DesiredEndDate,
                    GradingSystemId = request.GradingSystemId,
                    Status = "Rfi",
                    Students = students,
                    TrainerId = request.TrainerId,
                    CustomerId = request.CustomerId,
                    // Owners = new [] { Users.GetByUsername() }, // We need to get the guy with Sales role that was specified at the beggining
                    Owners = new [] { sales },
                    OwnersConfiguration = ownersConfiguration,
                    ContactPersons = contacts
                };

            Trainings.Create(newTraining);

            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Infrastructure.Workflows.Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity, new Dictionary<string, object>()
                {
                    {"argInTrainingId", newTraining.Id}
                });
            var results = proc.Start(PersistableIdleAction.Unload);

            newTraining.WokrflowId = (Guid?)results["InstanceId"];
            Trainings.Update(newTraining);

            var retTraining = new TrainingModel();

            return new HttpResult(retTraining)
                {
                    StatusCode = HttpStatusCode.Created,
                    Location = Request.AbsoluteUri.CombineWith(newTraining.Id)
                };
        }

        public HttpResult Put(UpdateTrainingModel request)
        {
            var training = Trainings.GetById(request.Id);
            var interviewPlan = training.InterviewPlans.FirstOrDefault();

            // Update the trainer
            training.TrainerId = request.TrainerId == 0 
                                    ? training.TrainerId 
                                    : request.TrainerId;
            
            // Update te DesiredStartDate
            training.DesiredStartDate =  request.DesiredStartDate == DateTimeOffset.MinValue.DateTime
                                            ? training.DesiredStartDate
                                            : request.DesiredStartDate;

            // Update the interviewPlanDateAndLocation if one exists
            if (interviewPlan != null)
            {
                interviewPlan.Date = request.InterviewDate == DateTimeOffset.MinValue.DateTime
                                         ? interviewPlan.Date
                                         : request.InterviewDate;
                Uow.InterviewPlans.Update(interviewPlan);
            }


            // update the owner configuration if one exists
            if (request.WorkflowOwners != null)
            {
                var config = training.OwnersConfiguration;
                var updateConfig = false;
                var newOwnerId = 0;
                if (config.SalesId != request.WorkflowOwners.Sales)
                {
                    config.SalesId = request.WorkflowOwners.Sales;
                    updateConfig = true;

                    if (training.Status == TrainingStatus.Rfi || training.Status == TrainingStatus.Offer)
                    {
                        newOwnerId = config.SalesId;

                    }
                }

                if (config.CoordinatorId != request.WorkflowOwners.Coordinator)
                {
                    config.CoordinatorId = request.WorkflowOwners.Coordinator;
                    updateConfig = true;

                    if (training.Status == TrainingStatus.Interview)
                    {
                        newOwnerId = config.CoordinatorId;
                        training.Owners = new[] { Uow.UserProfiles.GetById(config.CoordinatorId) };
                    }
                }

                if (config.AdministrationId != request.WorkflowOwners.Administration)
                {
                    config.AdministrationId = request.WorkflowOwners.Administration;
                    updateConfig = true;

                    if (training.Status == TrainingStatus.PlanInterview || training.Status == TrainingStatus.Accepted || training.Status == TrainingStatus.Rejected)
                    {
                        newOwnerId = config.AdministrationId;
                        training.Owners = new[] { Uow.UserProfiles.GetById(config.AdministrationId) };
                    }
                }
                if (updateConfig)
                {
                    Uow.TrainingOwnersConfiguration.Update(config);
                    if (newOwnerId > 0)
                    {
                        training.Owners = new List<UserProfile>() { Uow.UserProfiles.GetById(newOwnerId) };

                        Uow.Trainings.Update(training);
                        Uow.Commit();

                        var ownerToBeDeleted = training.Owners.First(u => u.Id != newOwnerId);
                        training.Owners.Remove(ownerToBeDeleted);

                        Uow.Trainings.Update(training);
                        Uow.Commit();
                    }
                }
            }

            Uow.Trainings.Update(training);

            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class UpdateTrainingModel
    {
        public DateTime InterviewDate { get; set; }
        public DateTime DesiredStartDate { get; set; }
        public int TrainerId { get; set; }
        public int Id { get; set; }
        public TrainingOwnersConfigurationModel WorkflowOwners { get; set; }
    }
}