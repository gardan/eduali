using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class ContactsService : Service
    {
        public IUow Uow { get; set; }

        public FilteredDataModel<ContactModel> Get(FilterParametersContacts request)
        {
            var results = Uow.Customers.GetById(request.CustomerId).ContactPersons;

            var retResults = new List<ContactModel>();

            foreach (var contactPerson in results)
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
            var contact = Uow.Contacts.GetById(request.Id);
            contact.InjectFrom(request);

            if (request.IsMain)
            {
                // does it have the "Customer Contact" role?
                if (!contact.UserProfile.Roles.Exists(r => r.RoleName == "Customer Contact"))
                {
                    // we also need to remove the role from the previous contact.
                    var customer = contact.Customer;
                    foreach (var contactPerson in customer.ContactPersons)
                    {
                        if (contactPerson.UserProfile.Roles.Exists(r => r.RoleName == "Customer Contact"))
                        {
                            contactPerson.UserProfile.Roles.Remove(
                                Uow.Roles.GetAll().FirstOrDefault(r => r.RoleName == "Customer Contact"));
                        }
                    }

                    // no, then add it.
                    contact.UserProfile.Roles.Add(
                        Uow.Roles.GetAll().FirstOrDefault(r => r.RoleName == "Customer Contact"));
                }
            }
            else
            {
                // does the contact have the "Customer Contact" role?
                if (contact.UserProfile.Roles.Exists(r => r.RoleName == "Customer Contact"))
                {
                    // yes, then remove it.
                    contact.UserProfile.Roles.Remove(
                        Uow.Roles.GetAll().FirstOrDefault(r => r.RoleName == "Customer Contact"));
                }
            }

            if (request.IsTrainingContact)
            {
                // does it have the "Customer Supervizor" role?
                if (!contact.UserProfile.Roles.Exists(r => r.RoleName == "Customer Supervizor"))
                {
                    contact.UserProfile.Roles.Add(
                        Uow.Roles.GetAll().FirstOrDefault(r => r.RoleName == "Customer Supervizor"));
                }
            }
            else
            {
                // does the contact have the "Customer Contact" role?
                if (contact.UserProfile.Roles.Exists(r => r.RoleName == "Customer Supervizor"))
                {
                    contact.UserProfile.Roles.Remove(
                       Uow.Roles.GetAll().FirstOrDefault(r => r.RoleName == "Customer Supervizor"));
                }
            }

            Uow.Contacts.Update(contact);
            Uow.Commit();

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
        public bool IsMain { get; set; }
        public bool IsTrainingContact { get; set; }
    }

    public class FilterParametersContacts : FilterArgumentsContacts
    {

    }
}