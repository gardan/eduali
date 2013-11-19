using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core;
using Ilc.Data.Contracts;
using Ilc.Web.Models;
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