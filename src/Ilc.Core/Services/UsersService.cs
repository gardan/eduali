using System.Linq;
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
    }
}
