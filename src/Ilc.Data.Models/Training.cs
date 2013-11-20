using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class Training : EntityBase
    {
        public bool Complete { get; set; }
        public bool Accepted { get; set; }
        
        public DateTimeOffset PlannedStartDate { get; set; }
        public DateTimeOffset PlannedEndDate { get; set; }

        public DateTimeOffset DesiredStartDate { get; set; }
        public DateTimeOffset DesiredEndDate { get; set; }

        public string Status { get; set; }
        public int SubjectId { get; set; }
        [ForeignKey("SubjectId")]
        public virtual Subject Subject { get; set; }

        private ICollection<Student> _students;
        public virtual ICollection<Student> Students
        {
            get { return _students ?? (_students = new List<Student>()); }
            set { _students = value; }
        }

        public int? TrainerId { get; set; }
        [ForeignKey("TrainerId")]
        public virtual Trainer Trainer { get; set; }

        public int CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public virtual Customer Customer { get; set; }

        /// <summary>
        /// Holds a list of all the users that at a current state of the training own it.
        /// </summary>
        public virtual ICollection<UserProfile> Owners { get; set; }

        public virtual ICollection<TrainingOffer> Offers { get; set; }

        public virtual ICollection<StudentInterview> Interviews { get; set; }

        public virtual ICollection<TrainingScheduleDay> ScheduleDays { get; set; }

        public virtual ICollection<InterviewPlan> InterviewPlans { get; set; }

        public virtual ICollection<ProgressEvaluation> ProgressEvaluations { get; set; }

        public virtual ICollection<TrainingEvaluation> TrainingEvaluations { get; set; }

        public virtual ICollection<Assesment> Assesments { get; set; } 

        public Guid? WokrflowId { get; set; }

        public TrainingOwnersConfiguration OwnersConfiguration { get; set; }

        public int GradingSystemId { get; set; }
        [ForeignKey("GradingSystemId")]
        public GradingSystem GradingSystem { get; set; }

        public string Color { get; set; }

        public int NoOfCustomerTraining { get; set; }

        public virtual ICollection<ContactPerson> ContactPersons { get; set; }
    }

    public class TrainingOwnersConfiguration : EntityBase
    {
        public int SalesId { get; set; }
        public int AdministrationId { get; set; }
        public int CoordinatorId { get; set; }
        public int TrainerId { get; set; }

        [Required]
        public Training Training { get; set; }
    }
}
