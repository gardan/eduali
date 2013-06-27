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
        public string StudentName { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string EndDate { get; set; }
        public string Language { get; set; }
        public string Trainer { get; set; }

        public string UsefulnessAnswer { get; set; }
        public string NextTrainingAnswer { get; set; }

        public bool Newsletter { get; set; }

        public string RemarksAnswer { get; set; }


        public virtual ICollection<EvaluationAnswer> EvaluationAnswers { get; set; }

    }

    public class EvaluationAnswer
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public int AnswerId { get; set; }
    }
}
