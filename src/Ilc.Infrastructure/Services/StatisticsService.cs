using System.Collections.Generic;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Infrastructure.Contracts;

namespace Ilc.Infrastructure.Services
{
    public class StatisticsService : IStatisticsService
    {
        public ICustomersService Customers { get; set; }

        public List<CustomerStatistics> GetCustomers()
        {
            var statisticsRet = new List<CustomerStatistics>();
            var customers = Customers.GetFiltered(new FilterArguments()).Data;
            foreach (var customer in customers)
            {
                statisticsRet.Add(new CustomerStatistics()
                    {
                        Id = customer.Id,
                        Name = customer.Name,
                        TrainingsNo = customer.Trainings.Count
                    });
            }
            return statisticsRet;
        }
    }
}