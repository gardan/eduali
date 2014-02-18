using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ilc.Web.Authentication.Contracts
{
    public interface IIdentityAuthenticationManager
    {
        bool CheckPasswordAndSignIn(string email, string password, bool isPersistent);
        bool IsAuthenticated();
        void Logout();
    }
}