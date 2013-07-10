using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ilc.Web.Authentication.Contracts
{
    public interface IIdentityAuthenticationManager
    {
        bool CheckPasswordAndSignIn(HttpContextBase context, string username, string password, bool isPersistent);
    }
}