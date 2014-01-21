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

        public bool ValidateLocalLogin(string username, string password)
        {
            var user = UsersService.GetByUsername(username);
            if (user == null) return false;

            return CheckPassword(username, password);
        }


        private bool CheckPassword(string username, string password)
        {
            return Membership.ValidateUser(username, password);
        }

        public void CreateLocalLogin(string username, string password)
        {
            Membership.CreateAccount(username, password);
        }
    }
}