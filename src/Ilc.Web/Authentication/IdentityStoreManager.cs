using System;
//using System.Web.Security;
using Ilc.Core.Contracts;
using Ilc.Web.Authentication.Contracts;

namespace Ilc.Web.Authentication
{
    public class IdentityStoreManager : IIdentityStoreManager
    {
        // this is set via DI
        public IUsersService UsersService { get; set; }
        public IMembershipService Membership { get; set; }

        public bool ValidateLocalLogin(string email, string password)
        {
            var user = UsersService.GetByEmail(email);
            if (user == null) return false;

            return CheckPassword(email, password);
        }


        private bool CheckPassword(string email, string password)
        {
            return Membership.ValidateUser(email, password);
        }

        public void CreateLocalLogin(string username, string password)
        {
            Membership.CreateAccount(username, password);
        }
    }
}