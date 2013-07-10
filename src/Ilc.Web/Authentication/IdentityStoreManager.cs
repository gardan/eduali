using System;
using Ilc.Web.Authentication.Contracts;

namespace Ilc.Web.Authentication
{
    public class IdentityStoreManager : IIdentityStoreManager
    {
        public bool ValidateLocalLogin(string username, string password)
        {
            throw new NotImplementedException();
        }
    }
}