using System;
using System.Collections.Generic;
using System.IdentityModel.Services;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Security.Claims;
using System.Web;
using Ilc.Web.Authentication.Contracts;

namespace Ilc.Web.Authentication
{
    public class IdentityAuthenticationManager : IIdentityAuthenticationManager
    {
        public IIdentityStoreManager IdentityStoreManager { get; set; }

        public bool CheckPasswordAndSignIn(HttpContextBase context, string username, string password, bool isPersistent)
        {
            if (IdentityStoreManager.ValidateLocalLogin(username, password))
            {

                var principal = CreateApplicationPrincipal(username);
                EstablishSession(principal);

                return true;
            }
            return false;
        }

        private ClaimsPrincipal CreateApplicationPrincipal(string username)
        {
            var claims = new List<Claim>() { new Claim(ClaimTypes.Name, username) };
            return new ClaimsPrincipal(new ClaimsIdentity(claims, "SAM"));
        }

        private void EstablishSession(ClaimsPrincipal principal)
        {
            var sessionToken = new SessionSecurityToken(principal);

            FederatedAuthentication.SessionAuthenticationModule.WriteSessionTokenToCookie(sessionToken);
        }

        public void Logout()
        {
            FederatedAuthentication.SessionAuthenticationModule.SignOut();
        }
    }
}