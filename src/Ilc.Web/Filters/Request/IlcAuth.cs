using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Web;
using Ilc.Web.Authentication.Contracts;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Filters.Request
{
    public class IlcAuth : RequestFilterAttribute
    {
        public IIdentityAuthenticationManager AuthManager { get; set; }

        public override void Execute(IHttpRequest req, IHttpResponse res, object requestDto)
        {
            if (!AuthManager.IsAuthenticated())
            {
                throw new AuthenticationException();
            }
        }
    }
}