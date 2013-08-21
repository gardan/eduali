using System;
using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class InterviewPlan : EntityBase
    {
        public DateTimeOffset Date { get; set; }
        public string Location { get; set; }

        public int TrainingId { get; set; }
        [ForeignKey("TrainingId")]
        public virtual Training Training { get; set; }
    }
}