using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;

namespace Ilc.Core.Services
{
    public class UsersService : IUsersService
    {
        public IUow Uow { get; set; }

        public FilteredResults<UserProfile> GetFiltered(FilterArguments parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            parameters.Filter = parameters.Filter ?? new List<Filter>();

            var query = Uow.UserProfiles.GetAll();
            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

            // search
            foreach (var filter in parameters.Filter)
            {
                var inFilter = filter;
                switch (filter.Field)
                {
                    case "username":
                        query = query.Where(c => c.Username.Contains(inFilter.Value));
                        break;
                    default:
                        // if trying to search for unavalable column, just exit
                        // TODO: log this shit.
                        break;
                }
            }

            // order
            query = query.OrderBy(e => e.Id);

            // paging
            query = query.Skip(parameters.StartIndex).Take(parameters.Length);

            return new FilteredResults<UserProfile>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = totalDisplayRecords,
                TotalRecords = totalDisplayRecords
            };
        }

        public UserProfile GetByUsername(string username)
        {
            return Uow.UserProfiles.GetAll().FirstOrDefault(u => u.Username == username);
        }

        public UserProfile GetByUsername()
        {
            var principal = ClaimsPrincipal.Current;
            return GetByUsername(principal.FindFirst(c => c.Type == ClaimTypes.Name).Value);
        }

        public UserProfile GetById(int id)
        {
            return Uow.UserProfiles.GetById(id);
        }

        public void Create(UserProfile user, string password)
        {
            // Create the profile
            Uow.UserProfiles.Add(user);
            Uow.Commit();

            // Create the membership
            var salt = Crypto.Crypto.GenerateSalt();
            var hashedPwd = Crypto.Crypto.Hash(salt + Crypto.Crypto.Hash(salt + password));

            Uow.Memberships.Add(new Membership()
                {
                    UserId = user.Id,
                    PasswordFailuresSinceLastSuccess = 0,
                    Password = hashedPwd,
                    PasswordSalt = salt
                });
            Uow.Commit();
        }

        public void Update(UserProfile user)
        {
            Uow.UserProfiles.Update(user);
            Uow.Commit();
        }
    }
}
