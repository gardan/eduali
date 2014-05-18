using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core;
using Ilc.Web.Models;
using ServiceStack;

namespace Ilc.Web.Services.Customers
{
    public class LogsService : Service
    {

        public FilteredDataModel<CustomerLogModel> Get(LogsFilterParameters request)
        {

            return new FilteredDataModel<CustomerLogModel>()
                {
                    Data = new List<CustomerLogModel>()
                        {
                            new CustomerLogModel() {Id = 1, Body = "Talked about important stuff", CreateDate = DateTime.UtcNow, Level = 100, Type = "Meeting" },
                            new CustomerLogModel() {Id = 2, Body = "Talked about more important stuff", CreateDate = DateTime.UtcNow.AddDays(-1), Level = 0, Type = "Email" },
                            new CustomerLogModel() {Id = 3, Body = "Talked about even more important stuff", CreateDate = DateTime.UtcNow.AddDays(-2), Level = 100, Type = "Phone" }
                        }
                };

        }

        public HttpResult Post(CustomerLogModel request)
        {
            return new HttpResult(new CustomerLogModel()
                {
                    Id = 4,
                })
                {
                    StatusCode = HttpStatusCode.Created
                };
        }

        public HttpResult Put(CustomerLogModel request)
        {
            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

    }

    public class CustomerLogModel
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public DateTime CreateDate { get; set; }
        public string Type { get; set; }
        public int Level { get; set; }
    }

    public class LogsFilterParameters : FilterArguments {
        public int CustomerId { get; set; } 
    }
}