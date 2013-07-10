namespace Ilc.Web.Authentication.Contracts
{
    public interface IIdentityStoreManager
    {
        bool ValidateLocalLogin(string username, string password);
    }
}