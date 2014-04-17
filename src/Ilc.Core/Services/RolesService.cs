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
        public IUsersService Users { get; set; }

        public FilteredResults<Role> GetFiltered(FilterArgumentsRoles parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            parameters.Filter = parameters.Filter ?? new List<Filter>();

            var user = Users.GetByEmail();
            var query = Uow.Roles.GetAll().Where(r => r.CompanyId == user.CompanyId);
            
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

        public Role GetById(int id)
        {
            return Uow.Roles.GetById(id);
        }

        public void Create(Role role)
        {
            var user = Users.GetByEmail();
            role.CompanyId = user.CompanyId;

            Uow.Roles.Add(role);
            Uow.Commit();
        }

        public void Update(Role role)
        {
            Uow.Roles.Update(role);
            Uow.Commit();
        }

        public Role GetByName(string name)
        {
            var user = Users.GetByEmail();
            return Uow.Roles.GetAll().FirstOrDefault(r => r.RoleName == name && r.CompanyId == user.CompanyId);
        }

        public void Delete(int id)
        {
            Uow.Roles.Delete(id);
            Uow.Commit();
        }
    }
}