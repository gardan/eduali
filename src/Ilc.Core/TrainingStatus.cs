using System.Collections.Generic;

namespace Ilc.Core
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

        // New statuses for public training
        public const string Planning = "Planning";
        public const string Publishing = "Publishing";
        public const string UserRegistration = "UserRegistration";
        public const string PendingValidation = "PendingValidation";
        public const string Validated = "Validated"; // => ProgressEvaluation
        public const string Cancelled = "Cancelled"; // => Rejected

        public static double GetWeight(string status)
        {
            return TrainingStatus._weights[status];
        }

        private static Dictionary<string, double> _weights =  new Dictionary<string, double>() {
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
                    { Complete, 1 },

                    { Planning, 0.11 },
                    { Publishing, 0.22 },
                    { UserRegistration, 0.33 },
                    { PendingValidation, 0.44 },
                    { Validated, 0 },
                    { Cancelled, 0 }
                };
    }
}
