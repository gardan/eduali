using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PnA2.Models.Contracts
{
    interface IWorkflowEntity
    {
        Guid InstanceId { get; set; }
    }
}
