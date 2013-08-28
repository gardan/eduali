using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class StringAnswer : EntityBase
    {
        public string Text { get; set; }

        public int StringQuestionId { get; set; }
        [ForeignKey("StringQuestionId")]
        public virtual StringQuestion StringQuestion { get; set; }

        public int TrainingEvaluationId { get; set; }
        [ForeignKey("TrainingEvaluationId")]
        public TrainingEvaluation TrainingEvaluation { get; set; }
    }
}