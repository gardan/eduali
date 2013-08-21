using System.Collections.Generic;
using Ilc.Data.Models;

namespace Ilc.Infrastructure.Workflows.TrainingPoco
{
    public class ProgressEvaluationModel
    {
        public bool Complete { get; set; }
        public List<ProgressEvaluation> Evaluations { get; set; }
    }
}