using System;
using Ilc.Web.Services;

namespace Ilc.Web.Models
{
    public class TrainingModel : StatusModel
    {
        public int Id { get; set; }

        public UserModel[] Owners { get; set; }
        public TrainerModel Trainer { get; set; }
        public CustomerModel Customer { get; set; }
        public SubjectModel Subject { get; set; }
        public InterviewPlanApiModel InterviewPlan { get; set; }

        public string TrainerName { get; set; }
        public string CustomerName { get; set; }
        public string SubjectName { get; set; }

        public DateTimeOffset DesiredStartDate { get; set; }
        public DateTimeOffset DesiredEndDate { get; set; }
        public StudentModel[] Students { get; set; }

        public int SubjectId { get; set; }
        public int CustomerId { get; set; }

        public int TrainerId { get; set; }
        public int GradingSystemId { get; set; }

        public OwnersModel WorkflowOwners { get; set; }
    }

    public abstract class StatusModel
    {
        public string Status { get; set; }
        public string StatusFriendlyName { get; set; }
    }

    public class InterviewPlanApiModel
    {
        public DateTimeOffset Date { get; set; }
        public string Location { get; set; }
    }
}