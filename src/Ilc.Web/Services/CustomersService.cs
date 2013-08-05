using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Data.Models;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class CustomersService : Service
    {

        public ICustomersService Customers { get; set; }

        public FilteredDataModel<CustomerModel> Get(FilterParametersCustomers request)
        {
            var results = Customers.GetFiltered(request);

            return new FilteredDataModel<CustomerModel>()
                {
                    TotalDisplayRecords = results.TotalDisplayRecords,
                    TotalRecords = results.TotalRecords,
                    Data = results.Data.Select(c => new CustomerModel().InjectFrom<CustomerToCustomerModel>(c) as CustomerModel).ToList()
                };
        }

        public HttpResult Post(CreateCustomerModel request)
        {
            var newCustomer = new Customer()
                {
                    Name = request.Name,
                    BankAccount = request.BankAccount,
                    BillingAddress = request.BillingAddress,
                    ContactPersons = new List<ContactPerson>() {new ContactPerson()
                        {
                            Name = request.ContactName,
                            Email = request.ContactEmail,
                            IsMain = true
                        }}
                };

            Customers.Create(newCustomer);

            var returnModel = new CustomerModel().InjectFrom<CustomerToCustomerModel>(newCustomer) as CustomerModel;

            return new HttpResult(returnModel)
                {
                    StatusCode = HttpStatusCode.Created,
                    Location = Request.AbsoluteUri.CombineWith(returnModel.Id)
                };
        }

        public HttpResult Put(EditCustomerModel request)
        {
            var editedCustomer = new Customer()
                {
                    BankAccount = request.BankAccount,
                    BillingAddress = request.BillingAddress,
                    Name = request.Name,
                    Id = request.Id
                };

            Customers.Update(editedCustomer);


            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }
}