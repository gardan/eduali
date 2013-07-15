using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Infrastructure.Contracts;

namespace Ilc.Infrastructure
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
