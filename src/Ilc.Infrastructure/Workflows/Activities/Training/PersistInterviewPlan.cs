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
    public class PersistInterviewPlan : CodeActivity
    {
        public InArgument<InterviewPlan> InterviewPlan { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            var uow = context.GetExtension<IUow>();
            var interviewPlan = InterviewPlan.Get<InterviewPlan>(context);
            uow.InterviewPlans.Add(interviewPlan);
            uow.Commit();
        }
    }
}
