using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ilc.Data.Models.Contracts
{
    public interface IAccessControlEntity
    {
        ICollection<UserProfile> Owners { get; }
    }
}
