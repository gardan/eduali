using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;

namespace Ilc.Infrastructure.Workflows.Activities.Training
{
    public class GetTrainingEvaluationStatistics : CodeActivity 
    {
        public OutArgument<Dictionary<string, object>>  TrainingEvaluationStatistics { get; set; }
        public InArgument<int> TrainingId { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            var trainings = context.GetExtension<ITrainingsService>();
            var training = trainings.GetById(TrainingId.Get<int>(context));
            var totalTrainingStudents = training.Students.Count();
            var totalTrainingEvaluations = training.TrainingEvaluations.Count();
            TrainingEvaluationStatistics.Set(context, new Dictionary<string, object>()
                {
                    { "TotalEvaluations", totalTrainingEvaluations },
                    { "TotalStudents", totalTrainingStudents }
                });
        }
    }
}
