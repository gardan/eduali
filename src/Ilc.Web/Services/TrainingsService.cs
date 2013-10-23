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

        public FilteredDataModel<TrainingModel> Get(FilterParametersTrainings request)
        {
            var ret = new FilteredDataModel<TrainingModel>();

            var results = Trainings.GetFilteredTrainings(request);
            ret.TotalDisplayRecords = results.TotalDisplayRecords;
            ret.TotalRecords = results.TotalRecords;
            ret.Data = results.Data.Select(r => new TrainingModel().InjectFrom <TrainingToWebModel>(r) as TrainingModel).ToList();

            return ret;
        }

        public HttpResult Post(CreateTrainingModel request)
        {
            var students = new List<Student>();

            foreach (var studentModel in request.Students)
            {
                var student = Students.GetByStudentId(studentModel.Id);
                students.Add(student);
            }

            var sales = Uow.UserProfiles.GetById(request.WorkflowOwners.Sales.Id);
            var administration = Uow.UserProfiles.GetById(request.WorkflowOwners.Administration.Id);
            var coordinator = Uow.UserProfiles.GetById(request.WorkflowOwners.Coordinator.Id);
            var trainer = Uow.UserProfiles.GetById(request.WorkflowOwners.Trainer.Id);


            var ownersConfiguration = new TrainingOwnersConfiguration()
                {
                    SalesId = sales.Id,
                    AdministrationId = administration.Id,
                    CoordinatorId = coordinator.Id,
                    TrainerId = trainer.Id
                };

            var newTraining = new Training
                {
                    SubjectId = request.SubjectId,
                    DesiredStartDate = request.DesiredStartDate,
                    DesiredEndDate = request.DesiredEndDate,
                    Status = "Rfi",
                    Students = students,
                    TrainerId = request.TrainerId,
                    CustomerId = request.CustomerId,
                    // Owners = new [] { Users.GetByUsername() }, // We need to get the guy with Sales role that was specified at the beggining
                    Owners = new [] { sales },
                    OwnersConfiguration = ownersConfiguration
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
            var interviewPlan = Uow.InterviewPlans.GetById(training.InterviewPlans.FirstOrDefault().Id);

            training.TrainerId = request.TrainerId == 0 
                                    ? training.TrainerId 
                                    : request.TrainerId;
            Uow.Trainings.Update(training);

            interviewPlan.Date = request.InterviewDate == DateTimeOffset.MinValue
                                     ? interviewPlan.Date
                                     : request.InterviewDate;
            Uow.InterviewPlans.Update(interviewPlan);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class UpdateTrainingModel
    {
        public DateTimeOffset InterviewDate { get; set; }
        public int TrainerId { get; set; }
        public int Id { get; set; }
    }
}