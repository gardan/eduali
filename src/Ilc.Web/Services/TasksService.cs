using System;
using System.Activities;
using System.Collections.Generic;
using System.EnterpriseServices;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Infrastructure;
using Ilc.Infrastructure.Workflows;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;
using Training = Ilc.Infrastructure.Workflows.Training;

namespace Ilc.Web.Services
{
    public class TasksService : Service
    {
        public IUow Uow { get; set; }
        public ITrainingsService Trainings { get; set; }
        public IOffersService Offers { get; set; }

        public FilteredDataModel<TaskModel> Get(FilterParametersTasks request)
        {
            var trainings = Uow.Trainings.GetAll().ToList();

            var data = new List<TaskModel>();

            foreach (var training in trainings)
            {
                var task = new TaskModel();
                task.Id = training.Id;
                task.Action = Char.ToLowerInvariant(training.Status[0]) + training.Status.Substring(1);
                task.Name = training.Status;
                task.CustomerName = training.Customer.Name;

                data.Add(task);

            }

            return new FilteredDataModel<TaskModel>()
                {
                    Data = data
                };
        }

        public HttpResult Post(RfiModel request)
        {
            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);
            var training = Uow.Trainings.GetById(request.TrainingId);

            var workflowData = new Infrastructure.Workflows.TrainingPoco.RfiModel();
            if (request.Complete)
            {
                workflowData.Complete = true;
            }
            else
            {
                workflowData.Offer = new TrainingOffer().InjectFrom(request) as TrainingOffer;
                workflowData.Offer.Price = request.PossibleCost;
                workflowData.Offer.NoLessons = request.LessonsNo;
            }

            proc.Resume(training.WokrflowId.Value, TrainingStatus.Rfi, workflowData, PersistableIdleAction.Unload);
            
            if (request.Complete)
            {
                training.Status = TrainingStatus.PlanInterview;
                Uow.Trainings.Update(training);
                Uow.Commit();
            }

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class RfiModel
    {
        public int TrainingId { get; set; }
        public decimal Price { get; set; }
        public int NoLessons { get; set; }
        public int LessonDuration { get; set; }

        public int PossibleCost { get; set; }
        public int LessonsNo { get; set; }

        public bool Complete { get; set; }
    }

    public class TaskModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Action { get; set; }
        public string CustomerName { get; set; }
    }

    public class FilterParametersTasks : FilterParametersBase
    {

    }
}