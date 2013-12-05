using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core;
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

        public FilteredDataModel<SpendingsStatisticsModel> Get(FilterParametersSpendingsStatisticsModel request)
        {
            var spendingsStats = Statistics.GetCustomersSpendings();

            return new FilteredDataModel<SpendingsStatisticsModel>()
            {
                Data = spendingsStats.Select(cs => new SpendingsStatisticsModel().InjectFrom(cs) as SpendingsStatisticsModel).ToList(),
                TotalRecords = 4,
                TotalDisplayRecords = 4
            };
        }

    }

    public class FilterParametersSpendingsStatisticsModel : FilterArguments
    {

    }

    public class SpendingsStatisticsModel
    {
        public string CustomerName { get; set; }
        public string SubjectName { get; set; }
        public string TrainingCompositeId { get; set; }
        public decimal Price { get; set; }
        public decimal Spendings { get; set; }
    }
}