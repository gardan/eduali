using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Data.Models;
using Ilc.Web.Models;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class CustomersService : Service
    {

        public FilteredDataModel<CustomerModel> Get(FilterParametersCustomers request)
        {
            return new FilteredDataModel<CustomerModel>()
                {
                    Data = new List<CustomerModel>()
                        {
                            new CustomerModel() {Id = 1, Name = "Google Inc."},
                            new CustomerModel() {Id = 2, Name = "Yahoo Inc."}
                        },
                        TotalDisplayRecords = 2,
                        TotalRecords = 2
                };
        }

        public HttpResult Post(CreateCustomerModel request)
        {
            var newCustomer = new Customer()
                {
                    BankAccount = request.BankAccount,
                    BillingAddress = request.BillingAddress,
                    ContactPersons = new List<ContactPerson>() {new ContactPerson()
                        {
                            Name = request.ContactName,
                            Email = request.ContactEmail,
                            IsMain = true
                        }}
                };
            return new HttpResult(newCustomer)
                {
                    StatusCode = HttpStatusCode.Created,
                    Location = Request.AbsoluteUri.CombineWith(newCustomer.Id)
                };
        }
    }
}