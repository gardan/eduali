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
    public class PersistProgressEvaluation : CodeActivity
    {
        public InArgument<ProgressEvaluation> ProgressEvalution { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            var uow = context.GetExtension<IUow>();
            var progressEval = ProgressEvalution.Get<ProgressEvaluation>(context);

            uow.ProgressEvaluations.Add(progressEval);
            uow.Commit();
        }
    }
}
