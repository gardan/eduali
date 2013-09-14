using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class StringAnswer : AnswerBase
    {
        public string Text { get; set; }
    }

    public class RadioGroupAnswer : AnswerBase
    {
        public int AnswerId { get; set; }
        [ForeignKey("AnswerId")]
        public RadioPossibleAnswer Answer { get; set; }
    }

    public class CheckboxAnswer : AnswerBase
    {
        public bool Checked { get; set; }
    }
}