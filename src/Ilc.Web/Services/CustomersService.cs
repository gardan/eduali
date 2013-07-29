using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Web.Models;
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
                            new CustomerModel() {Name = "Google Inc."},
                            new CustomerModel() {Name = "Yahoo Inc."}
                        },
                        TotalDisplayRecords = 2,
                        TotalRecords = 2
                };
        }
    }
}