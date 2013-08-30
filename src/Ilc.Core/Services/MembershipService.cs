using Ilc.Core.Contracts;
using Ilc.Data.Contracts;

namespace Ilc.Core.Services
{
    public class MembershipService : IMembershipService
    {
        public IUow Uow { get; set; }

        public bool ValidateUser(string username, string password)
        {
            return false;
        }

        public void CreateAccount(string username, string password)
        {
            throw new System.NotImplementedException();
        }
    }
}