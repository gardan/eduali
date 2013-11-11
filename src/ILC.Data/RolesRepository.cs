using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;

namespace Ilc.Data
{
    public class RolesRepository : Repository<Role>, IRolesRepository
    {
        public RolesRepository(DbContext dbContext) : base(dbContext) { }

        public List<RoleClaim> GetRolesClaims(IList<string> roles)
        {
            // return null;
            var context = (AppContext)DbContext; // TODO: i don't really like this.
            var retRoles = DbSet.Where(r => roles.Contains(r.RoleName)).ToList();
            var retClaims = new List<RoleClaim>();

            foreach (var role in retRoles)
            {
                foreach (var roleClaim in role.Claims.ToList())
                {
                    var exists = retClaims.Exists(c => c.Name == roleClaim.Name);
                    if (!exists)
                    {
                        retClaims.Add(roleClaim);
                    }
                }
            }
            return retClaims;
        }

        public List<Role> GetRolesByClaims(string[] claims)
        {
            var roles = DbSet.ToList();
            var retRoles = new List<Role>();
            foreach (var role in roles)
            {
                foreach (var claim in claims)
                {
                    if (role.Claims.Any(c => c.Name == claim))
                    {
                        retRoles.Add(role);
                    }
                }
            }

            return retRoles;
        }
    }
}
