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
        Role GetById(int id);
        void Create(Role role);
        void Update(Role role);
        Role GetByName(string name);
        void Delete(int id);
    }
}
