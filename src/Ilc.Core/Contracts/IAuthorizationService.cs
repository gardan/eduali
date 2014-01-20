namespace Ilc.Core.Contracts
{
    public interface IAuthorizationService
    {
        bool HasClaim(string claimName);
    }
}
