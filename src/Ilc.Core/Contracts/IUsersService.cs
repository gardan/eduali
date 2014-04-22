using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IUsersService
    {
        FilteredResults<UserProfile> GetFiltered(FilterArgumentsUsers parameters);
        UserProfile GetByEmail(string username);
        UserProfile GetByEmail();
        UserProfile GetById(int id);
        void Create(UserProfile user, string password);
        void Update(UserProfile user);
        void UpdatePassword(int userId, string password);
        void Delete(int id);
    }
}
