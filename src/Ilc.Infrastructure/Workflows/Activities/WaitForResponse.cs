using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ilc.Infrastructure.Workflows.Activities
{
    public class WaitForResponse<TResult> : NativeActivity<TResult>
    {
        public InArgument<string> ArgumentName { get; set; }

        protected override void Execute(NativeActivityContext context)
        {
            context.CreateBookmark(
                ArgumentName.Get<string>(context),
                (activityContext, bookmark, value) => Result.Set(activityContext, (TResult)value));
        }

        protected override bool CanInduceIdle
        {
            get { return true; }
        }
    }
}
