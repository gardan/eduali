using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public abstract class AnswerBase : EntityBase
    {
        public int TrainingEvaluationQuestionId { get; set; }
        [ForeignKey("TrainingEvaluationQuestionId")]
        public virtual TrainingEvaluationQuestion Question { get; set; }

        public int TrainingEvaluationId { get; set; }
        [ForeignKey("TrainingEvaluationId")]
        public TrainingEvaluation TrainingEvaluation { get; set; }
    }
}