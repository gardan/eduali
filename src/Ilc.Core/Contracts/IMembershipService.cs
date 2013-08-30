namespace Ilc.Core.Contracts
{
    public interface IMembershipService
    {
        bool ValidateUser(string username, string password);
        void CreateAccount(string username, string password);
    }
}
