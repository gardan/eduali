using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ilc.Web.Models
{
    public class CreateEvaluationModel
    {
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

        public int[] Answers { get; set; }

    }
}