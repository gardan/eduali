using System;
using System.Collections.Generic;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;

namespace Ilc.Core.Services
{
    public class ContactsService : IContactsService
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }
        public IRolesService Roles { get; set; }

        public FilteredResults<ContactPerson> GetFiltered(FilterArgumentsContacts parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            parameters.Filter = parameters.Filter ?? new List<Filter>();

            var query = Uow.Contacts.GetAll();
            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;
            
            // predefined filters
            if (parameters.CustomerId > 0)
            {
                query = query.Where(c => c.CustomerId == parameters.CustomerId);
            }

            if (parameters.TrainingId > 0)
            {
                query = query.Where(c => c.Trainings.Any(t => t.Id == parameters.TrainingId));
            }

            if (parameters.IsMain.HasValue)
            {
                query = query.Where(c => c.UserProfile.Roles.Any(r => r.RoleName == "Customer Contact") == parameters.IsMain.Value);
            }

            if (parameters.IsTrainingContact.HasValue)
            {
                query = query.Where(c => c.UserProfile.Roles.Any(r => r.RoleName == "Customer Supervizor") == parameters.IsTrainingContact.Value);
            }

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

            return new FilteredResults<ContactPerson>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = totalDisplayRecords,
                TotalRecords = totalDisplayRecords
            };
        }

        public void Create(ContactPerson contact)
        {
            // first create the user.
            var userProfile = contact.UserProfile;
            contact.UserProfile = null;

            // create the user
            var role = Roles.GetByName("Customer Supervizor");
            userProfile.Roles = new List<Role>() { role };
            Users.Create(userProfile, "");

            contact.UserProfileId = userProfile.Id;

            Uow.Contacts.Add(contact);
            Uow.Commit();
        }
    }
}