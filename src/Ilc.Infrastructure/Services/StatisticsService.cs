using System.Collections.Generic;
using System.Linq;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Infrastructure.Contracts;
using Ilc.Infrastructure.Workflows;

namespace Ilc.Infrastructure.Services
{
    public class StatisticsService : IStatisticsService
    {
        public ICustomersService Customers { get; set; }
        public IUow Uow { get; set; }

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

        public List<SpendingsStatistics> GetCustomersSpendings()
        {
            var ret = new List<SpendingsStatistics>();
            var trainings = Uow.Trainings.GetAll().ToList();

            foreach (var training in trainings)
            {
                // Skip if training status is smaller or equal to accepted
                if (TrainingStatus.GetWeight(training.Status) <= TrainingStatus.GetWeight(TrainingStatus.Offer))
                {
                    continue;
                }

                var selectedOffer = training.Offers.FirstOrDefault(o => o.Selected);

                ret.Add(new SpendingsStatistics()
                    {
                        Price = selectedOffer.Price,
                        Spendings = training.Spendings.Trainer,
                        CustomerName = training.Customer.Name,
                        SubjectName = training.Subject.Name,
                        TrainingCompositeId = string.Format("{0}-{1}", training.CustomerId, training.NoOfCustomerTraining)
                    });
            }

            return ret;
        }
    }
}