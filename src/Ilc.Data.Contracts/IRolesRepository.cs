using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;

namespace Ilc.Data.Contracts
{
    public interface IRolesRepository : IRepository<Role>
    {
        List<RoleClaim> GetRolesClaims(IList<string> roles);
        List<Role> GetRolesByClaims(string[] claims);
    }
}
