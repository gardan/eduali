using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Infrastructure.Contracts;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class StatisticsService : Service
    {
        public IStatisticsService Statistics { get; set; }

        public FilteredDataModel<CustomerStatisticsModel> Get(FilterParametersCustomerStatisticsModel request)
        {
            var customerStatistics = Statistics.GetCustomers();


            return new FilteredDataModel<CustomerStatisticsModel>()
                {
                    Data = customerStatistics.Select(cs => new CustomerStatisticsModel().InjectFrom(cs) as CustomerStatisticsModel).ToList(),
                    TotalRecords = 4,
                    TotalDisplayRecords = 4
                };
        }

    }
}