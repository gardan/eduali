using System;
using System.Collections.Generic;
using System.IdentityModel.Services;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Security.Claims;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Web.Authentication.Contracts;

namespace Ilc.Web.Authentication
{
    public class IdentityAuthenticationManager : IIdentityAuthenticationManager
    {
        public IIdentityStoreManager IdentityStoreManager { get; set; }
        public IUsersService Users { get; set; }
        public IClaimsService ClaimsService { get; set; }

        public bool CheckPasswordAndSignIn(HttpContextBase context, string email, string password, bool isPersistent)
        {
            if (IdentityStoreManager.ValidateLocalLogin(email, password))
            {

                var principal = CreateApplicationPrincipal(email);
                EstablishSession(principal);

                return true;
            }
            return false;
        }

        private ClaimsPrincipal CreateApplicationPrincipal(string email)
        {
            var claims = new List<Claim>() { new Claim(ClaimTypes.Name, email) };
            var usersClaims = ClaimsService.GetByUserId(Users.GetByEmail(email).Id);
            claims.AddRange(usersClaims.Select(usersClaim => new Claim(usersClaim, true.ToString())));

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