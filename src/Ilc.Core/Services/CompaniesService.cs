using System;
using System.Collections.Generic;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class CompaniesService : ICompaniesService
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }
        public ICompanyDefaultsService CompanyDefaults { get; set; }

        public FilteredResults<Company> GetFiltered(FilterArguments parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            parameters.Filter = parameters.Filter ?? new List<Filter>();

            var query = Uow.Companies.GetAll();
            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

            // search
            foreach (var filter in parameters.Filter)
            {
                var inFilter = filter;
                switch (filter.Field)
                {
                    case "id":
                        var id = Convert.ToInt32(inFilter.Value);
                        query = query.Where(c => c.Id == id);
                        break;
                    case "name":
                        query = query.Where(c => c.Name.Contains(inFilter.Value));
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

            return new FilteredResults<Company>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = totalDisplayRecords,
                TotalRecords = totalDisplayRecords
            };
        }

        public void Create(Company newCompany, UserProfile initialUser)
        {
            // 1. Create the company
            Uow.Companies.Add(newCompany);
            Uow.Commit();

            // 2. Create company defaults
            // 2.1. Roles
            // 2.2. Subjects
            // 2.3. Status Definitions
            // 2.4. Templates, maybe?
            var roles = CompanyDefaults.CreateRoles(newCompany.Id);
            CompanyDefaults.CreateSubjects(newCompany.Id);
            CompanyDefaults.CreateStatusDefinitions(newCompany.Id);
            
            // 3. Create the defaults user
            initialUser.CompanyId = newCompany.Id;
            initialUser.Roles = roles;
            Users.Create(initialUser, initialUser.UserDetails.Email);
        }
    }
}