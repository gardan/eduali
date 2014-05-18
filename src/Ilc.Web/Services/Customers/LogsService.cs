using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Core.Helpers;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Web.Models;
using ServiceStack;

namespace Ilc.Web.Services.Customers
{
    public class LogsService : Service
    {
        public ICustomerLogsManager CustomerLogs { get; set; }
        public IStamper Stamper { get; set; }
        public IUow Uow { get; set; }

        public FilteredDataModel<CustomerLogModel> Get(LogsFilterParameters request)
        {
            var result = CustomerLogs.GetFiltered(request);
            var data = new List<CustomerLogModel>();

            foreach (var customerLog in result.Data)
            {
                data.Add(new CustomerLogModel()
                    {
                        Id = customerLog.Id,
                        Body = customerLog.Body,
                        CreateDate = customerLog.CreateDate.DateTime,
                        CustomerId = customerLog.CustomerId,
                        Level = customerLog.Level,
                        Type = customerLog.Type
                    });
            }

            return new FilteredDataModel<CustomerLogModel>()
                {
                    Data = data,
                        TotalDisplayRecords = result.TotalDisplayRecords,
                        TotalRecords = result.TotalRecords
                };

        }

        public HttpResult Post(CustomerLogModel request)
        {
            var log = new CustomerLog()
                {
                    Body = request.Body,
                    CustomerId = request.CustomerId,
                    Level = request.Level,
                    Type = request.Type
                    };
            Stamper.Stamp(log);

            Uow.CustomerLogs.Add(log);
            Uow.Commit();

            return new HttpResult(new CustomerLogModel()
                {
                    Id = log.Id,
                })
                {
                    StatusCode = HttpStatusCode.Created
                };
        }

        public HttpResult Put(CustomerLogModel request)
        {
            var customerLog = Uow.CustomerLogs.GetById(request.Id);
            customerLog.Body = request.Body;
            customerLog.Level = request.Level;
            customerLog.Type = request.Type;
            customerLog.CreateDate = new DateTimeOffset(request.CreateDate, TimeSpan.Zero);

            Uow.CustomerLogs.Update(customerLog);
            Uow.Commit();

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

        public int CustomerId { get; set; }
    }

    public class LogsFilterParameters : FilterArgumentsCustomerLogs { }
}