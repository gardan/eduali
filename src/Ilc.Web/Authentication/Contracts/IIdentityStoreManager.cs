namespace Ilc.Web.Authentication.Contracts
{
    public interface IIdentityStoreManager
    {
        bool ValidateLocalLogin(string email, string password);
    }
}