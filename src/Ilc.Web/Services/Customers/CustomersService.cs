using System.Collections.Generic;
using System.Linq;
using System.Net;
using Ilc.Core.Contracts;
using Ilc.Data.Models;
using Ilc.Misc;
using Ilc.Web.Filters.Request;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services
{
    [IlcAuth]
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
                    CustomerId = request.CustomerId,
                    Name = request.Name,
                    Department = request.Department,
                    BillingAddress = request.BillingAddress,
                    Postcode = request.Postcode,
                    City = request.City,
                    Country = request.Country,
                    Phone = request.Phone,
                    BankName = request.BankName,
                    BankAccount = request.BankAccount,
                    FiscalCode = request.FiscalCode,
                    CommerceNumber = request.CommerceNumber,
                };

            Customers.Create(newCustomer);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.Created,
                    Location = Request.AbsoluteUri.CombineWith(newCustomer.Id)
                };
        }

        public HttpResult Put(EditCustomerModel request)
        {
            var editedCustomer = Customers.GetByCustomerId(request.Id);
            editedCustomer.InjectFrom(request);

            Customers.Update(editedCustomer);


            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Delete(DeleteCustomerModel request)
        {
            Customers.Delete(request.Id);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }
}