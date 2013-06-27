using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PnA2.Models.Contracts
{
    public interface IAccessControlEntity
    {
        ICollection<UserProfile> Owners { get; }
    }
}
