using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Data;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Infrastructure;
using Ilc.Infrastructure.Workflows;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services.Tasks.Training
{
    public class OpenTrainingsService : Service
    {
        public ITrainingsService Trainings { get; set; }
        public IUow Uow { get; set; }
        public IOffersService Offers { get; set; }

        public HttpResult Post(PlanningModel request)
        {
            var training = Trainings.GetById(request.TaskEntityId);

            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Infrastructure.Workflows.Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);

            var workflowData = new Dictionary<string, object>();

            if (!request.IsEmpty())
            {
                var schedule = new List<TrainingScheduleDay>();

                foreach (var lessonModel in request.Lessons)
                {
                    if (lessonModel.LessonSchedules.Count > 0)
                    {
                        var firstSchedule = lessonModel.LessonSchedules.First();
                        var scheduleDay = new TrainingScheduleDay()
                        {
                            Order = lessonModel.Id,
                            StartDate = firstSchedule.StartDate,
                            EndDate = firstSchedule.EndDate,
                            TrainingId = request.TaskEntityId,
                            LessonName = "Lesson " + lessonModel.Id
                        };
                        schedule.Add(scheduleDay);
                    }

                }

                workflowData["Schedule"] = schedule;
            }
            else // see: https://github.com/gardan/ILC/issues/74
            {
                if ((!request.Done))
                {
                    return new HttpResult()
                    {
                        StatusCode = HttpStatusCode.OK
                    };
                }
            }

            proc.Resume(training.WokrflowId.Value, TrainingStatus.Planning, workflowData,
                        PersistableIdleAction.Unload);

            return new HttpResult()
            {
                StatusCode = HttpStatusCode.OK
            };
        }

        public HttpResult Post(PublishingModel request)
        {
            var training = Trainings.GetById(request.TaskEntityId);
            
            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Infrastructure.Workflows.Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);
            
            var workflowData = new Dictionary<string, object>();

            proc.Resume(training.WokrflowId.Value, TrainingStatus.Publishing, workflowData,
                        PersistableIdleAction.Unload);


            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class PublishingModel
    {
        public bool Publish { get; set; }

        public int TaskEntityId { get; set; }
    }

    public class PlanningModel
    {
        public int TaskEntityId { get; set; }
        public List<LessonModel> Lessons { get; set; }

        public bool Done { get; set; }
        public bool IsEmpty()
        {
            return Lessons == null || Lessons.Count == 0;
        }
    }

}