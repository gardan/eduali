using System.Collections.Generic;
using System.Net;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Web.Filters.Request;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services
{
    [IlcAuth]
    public class ContactsService : Service
    {
        public IUow Uow { get; set; }
        public IContactsService Contacts { get; set; }
        public IRolesService Roles { get; set; }

        public FilteredDataModel<ContactModel> Get(FilterParametersContacts request)
        {
            var results = Contacts.GetFiltered(request);

            var retResults = new List<ContactModel>();

            foreach (var contactPerson in results.Data)
            {
                retResults.Add(new ContactModel()
                    {
                        Id = contactPerson.Id,
                        FirstName = contactPerson.UserProfile.UserDetails.FirstName,
                        LastName = contactPerson.UserProfile.UserDetails.LastName,
                        IsMain = contactPerson.UserProfile.Roles.Exists(r => r.RoleName == "Customer Contact"),
                        IsTrainingContact = contactPerson.UserProfile.Roles.Exists(r => r.RoleName == "Customer Supervizor"), 
                    });
            }

            return new FilteredDataModel<ContactModel>()
                {
                    Data = retResults
                };
        }

        public HttpResult Put(ContactModel request)
        {
            var customerContact = "Customer Contact";
            var customerSupervizor = "Customer Supervizor"; 
            var contact = Uow.Contacts.GetById(request.Id);
            contact.InjectFrom(request);

            if (request.IsMain)
            {
                // does it have the "Customer Contact" role?
                if (!contact.UserProfile.Roles.Exists(r => r.RoleName == customerContact))
                {
                    // we also need to remove the role from the previous contact.
                    var customer = contact.Customer;
                    foreach (var contactPerson in customer.ContactPersons)
                    {
                        if (contactPerson.UserProfile.Roles.Exists(r => r.RoleName == customerContact))
                        {
                            contactPerson.UserProfile.Roles.Remove(
                                Roles.GetByName(customerContact));
                        }
                    }

                    // no, then add it.
                    contact.UserProfile.Roles.Add(
                        Roles.GetByName(customerContact));
                }
            }
            else
            {
                // does the contact have the "Customer Contact" role?
                if (contact.UserProfile.Roles.Exists(r => r.RoleName == customerContact))
                {
                    // yes, then remove it.
                    contact.UserProfile.Roles.Remove(
                        Roles.GetByName(customerContact));
                }
            }

            if (request.IsTrainingContact)
            {
                // does it have the "Customer Supervizor" role?
                if (!contact.UserProfile.Roles.Exists(r => r.RoleName == customerSupervizor))
                {
                    contact.UserProfile.Roles.Add(
                        Roles.GetByName(customerSupervizor));
                }
            }
            else
            {
                // does the contact have the "Customer Contact" role?
                if (contact.UserProfile.Roles.Exists(r => r.RoleName == customerSupervizor))
                {
                    contact.UserProfile.Roles.Remove(
                       Roles.GetByName(customerSupervizor));
                }
            }

            Uow.Contacts.Update(contact);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Post(CreateContactModel request)
        {
            var contactPerson = new ContactPerson()
                {
                    UserProfile = new UserProfile() { UserDetails = new UserDetails() }
                };
            contactPerson.CustomerId = request.CustomerId;
            contactPerson.UserProfile.Email = request.Email;
            contactPerson.UserProfile.UserDetails.Phone = request.Phone;
            contactPerson.UserProfile.UserDetails.FirstName = request.FirstName;
            contactPerson.UserProfile.UserDetails.LastName = request.LastName;

            Contacts.Create(contactPerson);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class ContactModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Name { get { return string.Format("{0} {1}", FirstName, LastName); } }
        public bool IsMain { get; set; }
        public bool IsTrainingContact { get; set; }
    }

    public class CreateContactModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int CustomerId { get; set; }
    }

    public class FilterParametersContacts : FilterArgumentsContacts
    {

    }
}