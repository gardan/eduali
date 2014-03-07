using Ilc.Web.Authentication.Contracts;
using ServiceStack;
using ServiceStack.Web;
using AuthenticationException = System.Security.Authentication.AuthenticationException;

namespace Ilc.Web.Filters.Request
{
    public class IlcAuth : RequestFilterAttribute
    {
        public IIdentityAuthenticationManager AuthManager { get; set; }

        public override void Execute(IRequest req, IResponse res, object requestDto)
        {
            if (!AuthManager.IsAuthenticated())
            {
                throw new AuthenticationException();
            }
        }
    }
}