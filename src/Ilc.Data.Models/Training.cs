﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class Training : EntityBase
    {
        public string TrainingId { get; set; }
        public bool Complete { get; set; }
        public bool Accepted { get; set; }
        
        public DateTimeOffset PlannedStartDate { get; set; }
        public DateTimeOffset PlannedEndDate { get; set; }

        public DateTimeOffset DesiredStartDate { get; set; }
        public DateTimeOffset DesiredEndDate { get; set; }

        public string Location { get; set; }

        public int? StatusId { get; set; }
        [ForeignKey("StatusId")]
        public virtual StatusDictionary Status { get; set; }
        
        public int SubjectId { get; set; }
        [ForeignKey("SubjectId")]
        public virtual Subject Subject { get; set; }

        private ICollection<Student> _students;
        public virtual ICollection<Student> Students
        {
            get { return _students ?? (_students = new List<Student>()); }
            set { _students = value; }
        }

        [NotMapped]
        public int? TrainerId { get; set; }
        // [ForeignKey("TrainerId")]
        [NotMapped]
        public virtual Trainer Trainer { get; set; }

        public int? CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public virtual Customer Customer { get; set; }

        // Open training properties
        public bool Public { get; set; }
        public int RequiredStudents { get; set; }
        public decimal Price { get; set; }
        public DateTimeOffset DateOfValidation { get; set; }

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

        public virtual ICollection<Offer> DecoupledOffers { get; set; }

        public virtual ICollection<Expense> Expenses { get; set; }

        public Guid? WokrflowId { get; set; }

        [NotMapped()]
        public virtual TrainingOwnersConfiguration OwnersConfiguration { get; set; }

        [NotMapped()]
        public int GradingSystemId { get; set; }
        [ForeignKey("GradingSystemId")]
        [NotMapped()]
        public virtual GradingSystem GradingSystem { get; set; }

        public string Color { get; set; }

        public int NoOfCustomerTraining { get; set; }

        public virtual ICollection<ContactPerson> ContactPersons { get; set; }

        public virtual Spendings Spendings { get; set; }

        [NotMapped()]
        public virtual ICollection<GradingAttribute> GradingAttributes { get; set; }


        public virtual ICollection<UserProfile> StakeHolders { get; set; }

        public int TotalHours { get; set; }
    }
}
