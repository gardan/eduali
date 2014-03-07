using System;
using System.Net;
using Ilc.Web.Authentication.Contracts;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class AuthenticationService : Service
    {
        public IIdentityAuthenticationManager AuthenticationManager { get; set; }

        public HttpResult Get(AuthModel request)
        {
            var authenticated = AuthenticationManager.CheckPasswordAndSignIn(request.Email, request.Password, true);
            if (!authenticated)
            {
                throw new ArgumentException("Invalid arguments");
            }
            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class AuthModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}