using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IUsersService
    {
        FilteredResults<UserProfile> GetFiltered(FilterArgumentsUsers parameters);
        UserProfile GetByUsername(string username);
        UserProfile GetByUsername();
        UserProfile GetById(int id);
        void Create(UserProfile user, string password);
        void Update(UserProfile user);
    }
}
