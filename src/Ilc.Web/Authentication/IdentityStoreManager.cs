using System;
using System.Web.Security;
using Ilc.Core.Contracts;
using Ilc.Web.Authentication.Contracts;
using WebMatrix.WebData;

namespace Ilc.Web.Authentication
{
    public class IdentityStoreManager : IIdentityStoreManager
    {
        // this is set via DI
        public IUsersService UsersService { get; set; }

        public bool ValidateLocalLogin(string username, string password)
        {
            var user = UsersService.GetByUsername(username);
            if (user == null) return false;

            if (CheckPassword(username, password)) return false;

            return false;
        }


        private bool CheckPassword(string username, string password)
        {
            return Membership.ValidateUser(username, password);
        }
    }
}