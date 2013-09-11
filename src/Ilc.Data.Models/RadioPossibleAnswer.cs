using System.Collections.Generic;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class RadioPossibleAnswer : EntityBase
    {
        public string Text { get; set; }
        public virtual ICollection<TrainingEvaluationQuestion> Answers { get; set; }
    }
}