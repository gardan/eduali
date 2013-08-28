using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Infrastructure.Workflows.Activities.Training
{
    public class PersistTrainingEvaluation : CodeActivity
    {
        public InArgument<TrainingEvaluation> TrainingEvaluation { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            var uow = context.GetExtension<IUow>();
            var evaluation = TrainingEvaluation.Get<TrainingEvaluation>(context);
            uow.TrainingEvaluations.Add(evaluation);
            uow.Commit();
        }
    }
}
