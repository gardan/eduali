using System;
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
using Ilc.Web.Filters.Response;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services.Tasks.Training
{
    public class TasksService : Service
    {
        public IUow Uow { get; set; }
        public ITrainingsService Trainings { get; set; }
        public IUsersService Users { get; set; }
        public IOffersService Offers { get; set; }

        [TaskModelWithStatusResponseFilter]
        public FilteredDataModel<TaskModel> Get(FilterParametersTasks request)
        {
            var currentUser = Users.GetByEmail();


            // var trainings = Uow.Trainings.GetAll().Where(t => t.Owners.Any(u => u.Id == currentUser.Id)).ToList();

            var trainings = new List<Data.Models.Training>();

            foreach (var training in Uow.Trainings.GetAll().ToList())
            {
                foreach (var userProfile in training.Owners)
                {
                    if (userProfile.Id == currentUser.Id)
                    {
                        trainings.Add(training);
                    }
                }
            }

            var data = new List<TaskModel>();

            foreach (var training in trainings)
            {
                if (training.Status == TrainingStatus.Complete) continue;

                var task = new TaskModel();
                task.Id = training.Id;
                task.Action = Char.ToLowerInvariant(training.Status[0]) + training.Status.Substring(1);
                task.Name = training.Status;
                // task.CustomerName = training.Customer.Name;
                task.TaskObject = new TrainingModel().InjectFrom<TrainingToWebModel>(training) as TrainingModel;

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
            var wfActivity = new Infrastructure.Workflows.Training();
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
            else
            {
                workflowData["OfferId"] = request.OfferId;
            }

            proc.Resume(training.WokrflowId.Value, TrainingStatus.Rfi, workflowData, PersistableIdleAction.Unload);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Post(InterviewPlanModel request)
        {
            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Infrastructure.Workflows.Training();
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
            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Post(StudentInterviewModel request)
        {
            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Infrastructure.Workflows.Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);
            var training = Trainings.GetById(request.TaskEntityId);

            var workflowData = new Dictionary<string, object>();

            if (!request.IsEmpty())
            {
                var interview = new StudentInterview().InjectFrom<StudentInterviewModelToStudentInterview>(request) as StudentInterview;
                interview.TrainingId = request.TaskEntityId;
                workflowData["Interview"] = interview;
            }

            proc.Resume(training.WokrflowId.Value, TrainingStatus.Interview, workflowData,
                        PersistableIdleAction.Unload);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Post(TrainingOfferModel request)
        {
            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Infrastructure.Workflows.Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);
            var training = Trainings.GetById(request.TaskEntityId);

            var workflowData = new Dictionary<string, object>();

            workflowData["Complete"] = request.Action == TrainingStatus.Accepted;
            workflowData["OfferId"] = request.OfferId;

            proc.Resume(training.WokrflowId.Value, TrainingStatus.Offer, workflowData,
                        PersistableIdleAction.Unload);

            return new HttpResult()
            {
                StatusCode = HttpStatusCode.OK
            };
        }
        public HttpResult Post(TrainingOfferSelectModel request)
        {
            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Infrastructure.Workflows.Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);
            var training = Uow.Trainings.GetById(request.TrainingId);

            var workflowData = new Dictionary<string, object>();

            if (request.OfferId == 0)
            {
                var offer = new TrainingOffer().InjectFrom(request) as TrainingOffer;
                offer.Price = request.PossibleCost;
                offer.NoLessons = request.LessonsNo;

                workflowData["Offer"] = offer;
            }
            else
            {
                workflowData["OfferId"] = request.OfferId;
            }

            proc.Resume(training.WokrflowId.Value, "SelectOffer", workflowData, PersistableIdleAction.Unload);

            return new HttpResult()
            {
                StatusCode = HttpStatusCode.OK
            };
        }


        public HttpResult Post(AcceptedModel request)
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
                var requiredNoOfLesson = training.Offers.FirstOrDefault(o => o.Selected).NoLessons;
                var currentNoOfLessons = Uow.TrainingScheduleDays.GetAll().Count(sd => sd.TrainingId == training.Id);
                if (currentNoOfLessons < requiredNoOfLesson)
                {
                    return new HttpResult()
                    {
                        StatusCode = HttpStatusCode.OK
                    };
                }

            }

            proc.Resume(training.WokrflowId.Value, TrainingStatus.Accepted, workflowData,
                        PersistableIdleAction.Unload);

            return new HttpResult()
            {
                StatusCode = HttpStatusCode.OK
            };
        }

        public HttpResult Post(PlannedModel request)
        {
            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Infrastructure.Workflows.Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);
            var training = Trainings.GetById(request.TaskEntityId);

            var workflowData = new Dictionary<string, object>();

            proc.Resume(training.WokrflowId.Value, TrainingStatus.Planned, workflowData,
                        PersistableIdleAction.Unload);

            return new HttpResult()
            {
                StatusCode = HttpStatusCode.OK
            };
        }

        public HttpResult Post(ProgressEvaluationModel request)
        {
            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Infrastructure.Workflows.Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);
            var training = Trainings.GetById(request.TaskEntityId);

            var workflowData = new Dictionary<string, object>();

            if (!request.IsEmpty())
            {
                workflowData["ProgressEvaluation"] = new ProgressEvaluation()
                    {
                        TrainingScheduleDayId = request.LessonId,
                        Progress = request.Progress,
                        StudentId = request.StudentId,
                        TrainingId = request.TaskEntityId
                    };
            }

            proc.Resume(training.WokrflowId.Value, TrainingStatus.ProgressEvaluation, workflowData,
                        PersistableIdleAction.Unload);

            return new HttpResult()
            {
                StatusCode = HttpStatusCode.OK
            };
        }

        public HttpResult Post(TrainingEvaluationModel request)
        {
            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Infrastructure.Workflows.Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);
            var training = Trainings.GetById(request.TaskEntityId);

            var workflowData = new Dictionary<string, object>();

            workflowData["TrainingEvaluation"] = Extract(request);
            workflowData["TrainingId"] = training.Id;

            var results = proc.Resume(training.WokrflowId.Value, TrainingStatus.TrainingEvaluation, workflowData,
                        PersistableIdleAction.Unload);

            return new HttpResult()
            {
                StatusCode = HttpStatusCode.OK
            };


        }

        public HttpResult Post(EndedModel request)
        {
            var extensionManager = new TrainingExtensionManager(Trainings, Offers, Uow);
            var wfActivity = new Infrastructure.Workflows.Training();
            var proc = new WorkflowProcess(extensionManager, wfActivity);
            var training = Trainings.GetById(request.TaskEntityId);

            var workflowData = new Dictionary<string, object>();

            if (request.StudentId != 0)
            {
                var currentUser = Users.GetByEmail();

                var assesment = new Assesment().InjectFrom(request) as Assesment;
                assesment.TrainingId = request.TaskEntityId;
                assesment.CreateDate = DateTimeOffset.UtcNow;
                assesment.Creator = currentUser;

                workflowData["Assesment"] = assesment;
            }

            var results = proc.Resume(training.WokrflowId.Value, TrainingStatus.Ended, workflowData,
                        PersistableIdleAction.Unload);

            if (request.StudentId == 0)
            {
                training.Status = TrainingStatus.Complete;
                training.Complete = true;
                Trainings.Update(training);
            }

            return new HttpResult()
            {
                StatusCode = HttpStatusCode.OK
            };
        }

        private TrainingEvaluation Extract(TrainingEvaluationModel request)
        {
            var trainingEval = new TrainingEvaluation();
            var currentUser = Users.GetByEmail();

            trainingEval.CreateDate = DateTimeOffset.UtcNow;
            trainingEval.Creator = currentUser;
            trainingEval.TrainingId = request.TaskEntityId;
            trainingEval.StudentId = Uow.Students.GetAll().FirstOrDefault(s => s.UserProfileId == currentUser.Id).Id;
            trainingEval.StringAnswers = new List<StringAnswer>();
            trainingEval.RadioGroupAnswers = new List<RadioGroupAnswer>();
            trainingEval.CheckboxAnswers = new List<CheckboxAnswer>();

            foreach (var stringAnswerModel in request.StringAnswers)
            {
                trainingEval.StringAnswers.Add(new StringAnswer()
                {
                    Text = stringAnswerModel.Text,
                    TrainingEvaluationQuestionId = stringAnswerModel.QuestionId
                });
            }

            foreach (var answer in request.RadioGroupAnswers)
            {
                trainingEval.RadioGroupAnswers.Add(new RadioGroupAnswer()
                {
                    AnswerId = answer.AnswerId,
                    TrainingEvaluationQuestionId = answer.QuestionId
                });
            }

            foreach (var answer in request.CheckboxAnswers)
            {
                trainingEval.CheckboxAnswers.Add(new CheckboxAnswer()
                {
                    Checked = answer.Checked,
                    TrainingEvaluationQuestionId = answer.QuestionId
                });
            }
            return trainingEval;
        }
    }

    public class EndedModel
    {
        public string EntryListeningLevel { get; set; }
        public string ExitListeningLevel { get; set; }

        public string EntryReadingLevel { get; set; }
        public string ExittReadingLevel { get; set; }

        public string EntryInteractiveTalkingLevel { get; set; }
        public string ExitInteractiveTalkingLevel { get; set; }

        public string EntryProductiveTalkingLevel { get; set; }
        public string ExitProductiveTalkingLevel { get; set; }

        public string EntryWritingLevel { get; set; }
        public string ExitWritingLevel { get; set; }

        public string EntryRemarks { get; set; }
        public string ExitRemarks { get; set; }

        public int StudentId { get; set; }
        public int TaskEntityId { get; set; }
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

        public bool IsEmpty()
        {
            return Lessons == null || Lessons.Count == 0;
        }
    }

    public class RejectedModel
    {
        public int TaskEntityId { get; set; }
    }

    public class TrainingOfferSelectModel : RfiModel
    {
        
    }

    public class TrainingOfferModel
    {
        public string Action { get; set; }
        public int TaskEntityId { get; set; }
        public int OfferId { get; set; }
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

        public List<InterviewResultModel> InterviewResults { get; set; }

        public int StudentId { get; set; }

        public int TaskEntityId { get; set; }

        public bool IsEmpty()
        {
            return StudentId == 0;
        }
    }

    public class InterviewResultModel
    {
        public int GradingAttributeId { get; set; }
        public int CurrentGradeId { get; set; }
        public int TargetGradeId { get; set; }
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
        public List<RadioGroupAnswerModel> RadioGroupAnswers { get; set; }
        public List<CheckboxAnswerModel> CheckboxAnswers { get; set; }

        // These properties should not really be here, 
        // we can infer them when using the workflow
        public int StudentId { get; set; }
        public int TrainingId { get; set; }

        public int TaskEntityId { get; set; }
    }

    public class RadioGroupAnswerModel
    {
        public int QuestionId { get; set; }
        public int AnswerId { get; set; }
    }

    public class CheckboxAnswerModel
    {
        public int QuestionId { get; set; }
        public bool Checked { get; set; }
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
        public int OfferId { get; set; }
    }

    public class TaskModel : StatusModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Action { get; set; }
        public string CustomerName { get; set; }
        public dynamic TaskObject { get; set; }
    }

    public class FilterParametersTasks : FilterParametersBase
    {

    }
}