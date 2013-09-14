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
        public IUsersService Users { get; set; }
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

            var workflowData = new Dictionary<string, object>();

            if (!request.Complete)
            {
                var offer = new TrainingOffer().InjectFrom(request) as TrainingOffer;
                offer.Price = request.PossibleCost;
                offer.NoLessons = request.LessonsNo;

                workflowData["Offer"] = offer;
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

        public HttpResult Post(InterviewPlanModel request)
        {
            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);
            var training = Trainings.GetById(request.TaskEntityId);

            var workflowData = new Dictionary<string, object>();
            if (!request.IsEmpty())
            {
                var interviewPlan = new InterviewPlan().InjectFrom(request) as InterviewPlan;
                interviewPlan.TrainingId = request.TaskEntityId;
                workflowData["InterviewPlan"] = interviewPlan;
            }

            proc.Resume(training.WokrflowId.Value, TrainingStatus.PlanInterview, workflowData,
                        PersistableIdleAction.Unload);

            training.Status = TrainingStatus.Interview;
            Trainings.Update(training);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Post(StudentInterviewModel request)
        {
            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);
            var training = Trainings.GetById(request.TaskEntityId);

            var workflowData = new Dictionary<string, object>();

            if (!request.IsEmpty())
            {
                var interview = new StudentInterview().InjectFrom(request) as StudentInterview;
                interview.TrainingId = request.TaskEntityId;
                workflowData["Interview"] = interview;
            }

            proc.Resume(training.WokrflowId.Value, TrainingStatus.Interview, workflowData,
                        PersistableIdleAction.Unload);

            if (request.IsEmpty())
            {
                training.Status = TrainingStatus.Offer;
                Trainings.Update(training);
            }

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Post(TrainingOfferModel request)
        {
            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);
            var training = Trainings.GetById(request.TaskEntityId);

            var workflowData = new Dictionary<string, object>();

            workflowData["Complete"] = request.Action == TrainingStatus.Accepted;

            proc.Resume(training.WokrflowId.Value, TrainingStatus.Offer, workflowData,
                        PersistableIdleAction.Unload);

            training.Status = (bool)workflowData["Complete"] ? TrainingStatus.Accepted : TrainingStatus.Rejected;
            Trainings.Update(training);
            

            return new HttpResult()
            {
                StatusCode = HttpStatusCode.OK
            };
        }

        public HttpResult Post(AcceptedModel request)
        {
            var training = Trainings.GetById(request.TaskEntityId);

            var schedule = new List<TrainingScheduleDay>();

            foreach (var lessonModel in request.Lessons)
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


            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);

            var workflowData = new Dictionary<string, object>();

            workflowData["Schedule"] = schedule;

            proc.Resume(training.WokrflowId.Value, TrainingStatus.Accepted, workflowData,
                        PersistableIdleAction.Unload);

            training.Status = TrainingStatus.Planned;
            Trainings.Update(training);


            return new HttpResult()
            {
                StatusCode = HttpStatusCode.OK
            };
        }

        public HttpResult Post(PlannedModel request)
        {
            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);
            var training = Trainings.GetById(request.TaskEntityId);

            var workflowData = new Dictionary<string, object>();

            proc.Resume(training.WokrflowId.Value, TrainingStatus.Planned, workflowData,
                        PersistableIdleAction.Unload);

            training.Status = TrainingStatus.ProgressEvaluation;
            Trainings.Update(training);


            return new HttpResult()
            {
                StatusCode = HttpStatusCode.OK
            };
        }

        public HttpResult Post(ProgressEvaluationModel request)
        {
            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);
            var training = Trainings.GetById(request.TaskEntityId);

            var workflowData = new Dictionary<string, object>();

            if (!request.IsEmpty())
            {
                workflowData["ProgressEvaluation"] = new ProgressEvaluation()
                    {
                        Order = request.LessonId,
                        Progress = request.Progress,
                        StudentId = request.StudentId,
                        TrainingId = request.TaskEntityId
                    };
            }

            proc.Resume(training.WokrflowId.Value, TrainingStatus.ProgressEvaluation, workflowData,
                        PersistableIdleAction.Unload);

            if (request.IsEmpty())
            {
                training.Status = TrainingStatus.TrainingEvaluation;
                Trainings.Update(training);
            }
            
            return new HttpResult()
            {
                StatusCode = HttpStatusCode.OK
            };
        }

        public HttpResult Post(TrainingEvaluationModel request)
        {
            var trainingEval = new TrainingEvaluation();
            var currentUser = Users.GetByUsername();

            trainingEval.CreateDate = DateTimeOffset.UtcNow;
            trainingEval.Creator = currentUser;
            trainingEval.TrainingId = request.TaskEntityId;
            trainingEval.StudentId = currentUser.Id;
            trainingEval.StringAnswers = new List<StringAnswer>();

            foreach (var stringAnswerModel in request.StringAnswers)
            {
                trainingEval.StringAnswers.Add(new StringAnswer()
                    {
                        Text = stringAnswerModel.Text,
                        TrainingEvaluationQuestionId = stringAnswerModel.QuestionId
                    });
            }

            Uow.TrainingEvaluations.Add(trainingEval);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class ProgressEvaluationModel
    {
        public int TaskEntityId { get; set; }
        public string Progress { get; set; }
        public int LessonId { get; set; }
        public int StudentId { get; set; }

        public bool IsEmpty()
        {
            return (LessonId == 0 && string.IsNullOrEmpty(Progress));
        }
    }

    public class PlannedModel
    {
        public int TaskEntityId { get; set; }
    }

    public class AcceptedModel
    {
        public int TaskEntityId { get; set; }
        public List<LessonModel> Lessons { get; set; }
    }

    public class RejectedModel
    {
        public int TaskEntityId { get; set; }
    }

    public class TrainingOfferModel
    {
        public string Action { get; set; }
        public int TaskEntityId { get; set; }
    }

    public class StudentInterviewModel
    {
        public string ListeningLevel { get; set; }
        public string TargetListeningLevel { get; set; }

        public string ReadingLevel { get; set; }
        public string TargetReadingLevel { get; set; }

        public string InteractiveTalkingLevel { get; set; }
        public string TargetInteractiveTalkingLevel { get; set; }

        public string ProductiveTalkingLevel { get; set; }
        public string TargetProductiveTalkingLevel { get; set; }

        public string WritingLevel { get; set; }
        public string TargetWritingLevel { get; set; }
        
        public int StudentId { get; set; }

        public int TaskEntityId { get; set; }

        public bool IsEmpty()
        {
            return StudentId == 0;
        }
    }

    public class InterviewPlanModel
    {
        public DateTimeOffset Date { get; set; }
        public string Location { get; set; }
        public int TaskEntityId { get; set; }

        public bool IsEmpty()
        {
            return Date == DateTimeOffset.MinValue && string.IsNullOrEmpty(Location) && TaskEntityId == 0;
        }
    }

    public class TrainingEvaluationModel
    {
        public List<StringAnswerModel> StringAnswers { get; set; }

        // These properties should not really be here, 
        // we can infer them when using the workflow
        public int StudentId { get; set; }
        public int TrainingId { get; set; }

        public int TaskEntityId { get; set; }
    }

    public class StringAnswerModel
    {
        public string Text { get; set; }
        public int QuestionId { get; set; }
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