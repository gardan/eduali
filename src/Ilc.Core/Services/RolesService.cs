using System;
using System.Collections.Generic;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models.SimpleMembership;

namespace Ilc.Core.Services
{
    public class RolesService : IRolesService
    {
        public IUow Uow { get; set; }

        public FilteredResults<Role> GetFiltered(FilterArgumentsRoles parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            parameters.Filter = parameters.Filter ?? new List<Filter>();

            var query = Uow.Roles.GetAll();
            
            // predefined search
            if (parameters.UserId > 0)
            {
                // query = query.Where(r => r.UserProfiles.Any(u => (u.Id == parameters.UserId) == parameters.Assigned));
                if (parameters.Assigned)
                {
                    query = query.Where(r => r.UserProfiles.Any(u => u.Id == parameters.UserId));
                }
                else
                {
                    query = query.Where(r => r.UserProfiles.All(u => u.Id != parameters.UserId));
                }
            }

            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

            // search
            foreach (var filter in parameters.Filter)
            {
                var inFilter = filter;
                switch (filter.Field)
                {
                    case "name":
                        query = query.Where(c => c.RoleName.Contains(inFilter.Value));
                        break;
                    default:
                        // if trying to search for unavailable column, just exit
                        // TODO: log this shit.
                        break;
                }
            }

            // order
            query = query.OrderBy(e => e.RoleId);

            // paging
            query = query.Skip(parameters.StartIndex).Take(parameters.Length);

            return new FilteredResults<Role>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = totalDisplayRecords,
                TotalRecords = totalDisplayRecords
            };
        }
    }
}