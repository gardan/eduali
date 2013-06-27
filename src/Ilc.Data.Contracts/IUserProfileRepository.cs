using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Data.Contracts
{
    public interface IUserProfileRepository : IRepository<UserProfile>
    {
        List<RoleClaim> GetUserClaims(int id);
    }
}
