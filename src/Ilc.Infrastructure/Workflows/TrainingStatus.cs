using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ilc.Infrastructure.Workflows
{
    public static class TrainingStatus
    {
        public const string Rfi = "Rfi";
        public const string PlanInterview = "PlanInterview";
        public const string Interview = "Interview";
        public const string Offer = "Offer";
        public const string Accepted = "Accepted";
        public const string Rejected = "Rejected";
        public const string Planned = "Planned";
        public const string ProgressEvaluation = "ProgressEvaluation";
        public const string Exam = "Exam";
        public const string TrainingEvaluation = "TrainingEvaluation";
        public const string Ended = "Ended";
        public const string Complete = "Complete";

        public static double GetWeight(string status)
        {
            var d = new Dictionary<string, double>()
                {
                    { Rfi, 0.1 },
                    { PlanInterview, 0.2 },
                    { Interview, 0.3 },
                    { Offer, 0.4 },
                    { Accepted, 0.5 },
                    { Rejected, 0.5 },
                    { Planned, 0.6 },
                    { ProgressEvaluation, 0.7 },
                    { Exam, 0.8 },
                    { TrainingEvaluation, 0.9 },
                    { Ended, 0.91 },
                    { Complete, 1 }
                };

            return d[status];
        }
    }
}
