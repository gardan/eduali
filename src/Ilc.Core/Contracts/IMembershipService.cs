namespace Ilc.Core.Contracts
{
    public interface IMembershipService
    {
        bool ValidateUser(string email, string password);
        void CreateAccount(string username, string password);
    }
}
