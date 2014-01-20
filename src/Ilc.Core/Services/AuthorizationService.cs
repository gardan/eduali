using System.Security.Claims;
using Ilc.Core.Contracts;

namespace Ilc.Core.Services
{
    public class AuthorizationService : IAuthorizationService
    {
        public bool HasClaim(string claimName)
        {
            return ClaimsPrincipal.Current.HasClaim(c => c.Type == claimName);
        }
    }
}