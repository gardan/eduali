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
            var username = contact.UserProfile.UserDetails.FirstName.Trim().Split(Convert.ToChar(" "))[0].ToLower();
            var userDetails = contact.UserProfile.UserDetails;
            contact.UserProfile = null;
            var originalUsername = username;
            // check to see if the email exists
            var index = 0;
            UserProfile user;
            var usernameFound = true;
            do
            {
                user = Uow.UserProfiles.GetAll().FirstOrDefault(u => u.Email == username);

                if (user != null)
                {
                    username = originalUsername + "_" + index++;
                    usernameFound = false;
                }
                else
                {
                    usernameFound = true;
                }
            } while (!usernameFound);

            // create the user
            var role = Roles.GetByName("Customer Supervizor");
            var newUser = new UserProfile() { Email = username, UserDetails = userDetails, Roles = new List<Role>() { role } };
            Users.Create(newUser, "");

            contact.UserProfileId = newUser.Id;

            Uow.Contacts.Add(contact);
            Uow.Commit();
        }
    }
}