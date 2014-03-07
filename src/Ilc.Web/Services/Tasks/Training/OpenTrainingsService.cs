using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Infrastructure;
using Ilc.Infrastructure.Workflows;
using ServiceStack;

namespace Ilc.Web.Services.Tasks.Training
{
    public class OpenTrainingsService : Service
    {
        public ITrainingsService Trainings { get; set; }
        public IUow Uow { get; set; }
        public IOffersService Offers { get; set; }
        public IUsersService Users { get; set; }
        public IStudentsService Students { get; set; }

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

        public HttpResult Post(PendingValidationModel request)
        {
            var training = Trainings.GetById(request.TaskEntityId);

            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Infrastructure.Workflows.Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);

            var workflowData = new Dictionary<string, object>();
            workflowData["Validation"] = request.Validate;

            proc.Resume(training.WokrflowId.Value, TrainingStatus.PendingValidation, workflowData,
                        PersistableIdleAction.Unload);


            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Post(UserRegistrationModel request)
        {
            var training = Trainings.GetById(request.TaskEntityId);

            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Infrastructure.Workflows.Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);

            var currentUserId = Users.GetByEmail().Id;
            var studentId = Students.GetByUserId(currentUserId).Id;

            var workflowData = new Dictionary<string, object>();
            workflowData["StudentId"] = studentId;

            proc.Resume(training.WokrflowId.Value, TrainingStatus.UserRegistration, workflowData,
                        PersistableIdleAction.Unload);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class UserRegistrationModel
    {
        public int TaskEntityId { get; set; }
    }

    public class PendingValidationModel
    {
        public int TaskEntityId { get; set; }
        public bool Validate { get; set; }
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