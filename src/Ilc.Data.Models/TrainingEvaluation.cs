using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class TrainingEvaluation : StampedEntity
    {
        public virtual List<StringAnswer> StringAnswers { get; set; }
        public virtual List<RadioGroupAnswer> RadioGroupAnswers { get; set; }
        public virtual List<CheckboxAnswer> CheckboxAnswers { get; set; } 


        public int TrainingId { get; set; }
        [ForeignKey("TrainingId")]
        public virtual Training Training { get; set; }

        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual Student Student { get; set; }
    }
}