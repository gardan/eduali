using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class ProgressEvaluation : EntityBase
    {
        public string Progress { get; set; }

        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual Student Student { get; set; }

        public int TrainingId { get; set; }
        [ForeignKey("TrainingId")]
        public virtual Training Training { get; set; }

        public int TrainingScheduleDayId { get; set; }
        [ForeignKey("TrainingScheduleDayId")]
        public virtual TrainingScheduleDay TrainingScheduleDay { get; set; }
    }
}