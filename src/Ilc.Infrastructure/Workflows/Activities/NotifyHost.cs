using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Infrastructure.Contracts;

namespace Ilc.Infrastructure.Workflows.Activities
{
    public class NotifyHost : CodeActivity
    {
        [RequiredArgument]
        public InArgument<IDictionary<string, object>> Arguments { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            var host = context.GetExtension<INotifyHost>();
            host.SendMessage(context.GetValue(Arguments));
        }
    }
}
