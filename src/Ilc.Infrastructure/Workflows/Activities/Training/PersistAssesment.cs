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
    public class PersistAssesment : CodeActivity
    {
        public InArgument<Assesment> Assesment { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            var uow = context.GetExtension<IUow>();
            var assesment = Assesment.Get<Assesment>(context);
            uow.Assesments.Add(assesment);
            uow.Commit();
        }
    }
}
