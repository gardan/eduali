using System;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;

namespace Ilc.Core.Services
{
    public class MembershipService : IMembershipService
    {
        public IUow Uow { get; set; }

        public bool ValidateUser(string username, string password)
        {
            var user = Uow.UserProfiles.GetAll().FirstOrDefault(u => u.Username == username);
            if (user == null)
            {
                throw new ArgumentException("Username does not exist.", username);
            }
            var membership = Uow.Memberships.GetById(user.Id);
            var hashedPwd = membership.Password;
            var salt = membership.PasswordSalt;

            if (hashedPwd == Crypto.Crypto.Hash(salt + Crypto.Crypto.Hash(salt + password)))
            {
                return true;
            }
            return false;
        }

        public void CreateAccount(string username, string password)
        {
            throw new System.NotImplementedException();
        }
    }
}