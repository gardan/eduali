using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.SimpleMembership;

namespace Ilc.Core.Contracts
{
    public interface IRolesService
    {
        FilteredResults<Role> GetFiltered(FilterArgumentsRoles parameters);
        void Create(Role role);
    }
}
