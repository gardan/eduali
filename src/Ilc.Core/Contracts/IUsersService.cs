using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IUsersService
    {
        FilteredResults<UserProfile> GetFiltered(FilterArguments parameters);
        UserProfile GetByUsername(string username);
        UserProfile GetByUsername();
    }
}
