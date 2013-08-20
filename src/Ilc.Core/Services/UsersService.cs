using System.Linq;
using System.Security.Claims;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class UsersService : IUsersService
    {
        public IUow Uow { get; set; }

        public UserProfile GetByUsername(string username)
        {
            return Uow.UserProfiles.GetAll().FirstOrDefault(u => u.Username == username);
        }

        public UserProfile GetByUsername()
        {
            var principal = ClaimsPrincipal.Current;
            return GetByUsername(principal.FindFirst(c => c.Type == ClaimTypes.Name).Value);
        }
    }
}
