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
    public class PersistInterview : CodeActivity
    {
        public InArgument<StudentInterview> Interview { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            var uow = context.GetExtension<IUow>();
            var interview = Interview.Get<StudentInterview>(context);
            uow.Interviews.Add(interview);
            uow.Commit();
        }
    }
}
