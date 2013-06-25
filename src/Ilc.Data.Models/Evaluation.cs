using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ilc.Data.Models
{
    public class Evaluation
    {
        public int Id { get; set; }
        public EvaluationQuestion[] EvaluationQuestions { get; set; }

    }

    public class EvaluationQuestion
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public Answer[] Answers { get; set; }
        public Answer ChosenAnswer { get; set; }
    }

    public class Answer
    {
        public int Id { get; set; }
        public string  Text { get; set; }
    }

}
