using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ilc.Web.Models
{
    public class TrainingEvaluationPdfModel
    {
        public List<RadioQuestion> RadioQuestions { get; set; }

        public List<StringQuestion> StringQuestions { get; set; }

        public List<CheckBoxQuestion> CheckBoxQuestions { get; set; }
    }

    public class CheckBoxQuestion
    {
        public string Text { get; set; }
        public bool Checked { get; set; }
    }

    public class StringQuestion
    {
        public string Text { get; set; }
        public string Answer { get; set; }
    }

    public class RadioQuestion
    {
        public IEnumerable<RadioQuestionAnswers> Answers { get; set; }

        public string Text { get; set; }

        public bool DisplayCategory { get; set; }

        public string CategoryName { get; set; }
    }

    public class RadioQuestionAnswers
    {
        public string Text { get; set; }

        public bool IsSelected { get; set; }
    }
}