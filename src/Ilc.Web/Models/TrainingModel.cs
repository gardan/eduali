using System;
using Ilc.Web.Services;

namespace Ilc.Web.Models
{
    public class TrainingModel : StatusModel
    {
        public int Id { get; set; }
        public string CompositeId {
            // TODO: move to a function that takes a training, and returns the compositeId
            get { return string.Format("{0}-{1}", CustomerId, NoOfCustomerTraining); }
        }

        public int NoOfCustomerTraining { get; set; }
        
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

        public SpendingModel Spendings { get; set; }

        /// <summary>
        /// Total no. of hours required to complete all the lessons
        /// </summary>
        /// <remarks>
        /// e.g. 1 lesson is 2 hours, and we have 20 lessons, 
        /// then <see cref="Hours" /> is equal to 2 * 20 = 40
        /// </remarks>
        public int Hours { get; set; }

        public int LessonsNo { get; set; }

        public decimal Price { get; set; }

        public TrainingOwnersConfigurationModel OwnersConfiguration { get; set; }
    }

    public class TrainingOwnersConfigurationModel
    {
        public int Sales { get; set; }
        public int Administration { get; set; }
        public int Coordinator { get; set; }
    }

    public abstract class StatusModel
    {
        public string Status { get; set; }
        public string StatusFriendlyName { get; set; }
    }

    public class InterviewPlanApiModel
    {
        public DateTime Date { get; set; }
        public string Location { get; set; }
    }
}