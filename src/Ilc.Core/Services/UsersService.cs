using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

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
    }
}
