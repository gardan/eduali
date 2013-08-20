using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IUsersService
    {
        UserProfile GetByUsername(string username);
        UserProfile GetByUsername();
    }
}
