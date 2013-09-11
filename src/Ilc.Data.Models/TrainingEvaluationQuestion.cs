using System.Collections.Generic;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class TrainingEvaluationQuestion : EntityBase
    {
        public string Text { get; set; }
        public string Type { get; set; }
        public virtual ICollection<RadioPossibleAnswer> Answers { get; set; }

    }
}