using System;
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
            var trainings = Uow.Trainings.GetAll().Where(t => t.Public == false).ToList();

            foreach (var training in trainings)
            {
                var innerTraining = training;
                // Skip if training status is smaller or equal to accepted
//                if (TrainingStatus.GetWeight(training.Status) <= TrainingStatus.GetWeight(TrainingStatus.Offer))
//                {
//                    continue;
//                }

                var selectedOffer = training.Offers.FirstOrDefault(o => o.Selected);

                if (selectedOffer == null) continue;

                var expenses = Uow.Expenses.GetAll().Where(e => e.TrainingId == innerTraining.Id);
                decimal totalExpenses = 0;
                if (expenses.Count() > 0)
                {
                    totalExpenses = expenses.Sum(e => e.Ammount);
                }
                


                ret.Add(new SpendingsStatistics()
                    {
                        Price = selectedOffer.Price,
                        Spendings = totalExpenses,
                        CustomerName = training.Customer.Name,
                        SubjectName = training.Subject.Name,
                        TrainingCompositeId = string.Format("{0}-{1}", training.CustomerId, training.NoOfCustomerTraining)
                    });
            }

            return ret;
        }

        public List<TrainingStatistics> GetSubjectTrainingsPerMonth(FilterArgumentsTrainingStatistics request)
        {
            var ret = new List<TrainingStatistics>();
            var trainings = Uow.Trainings.GetAll().Where(t => t.DesiredStartDate.Year == DateTimeOffset.UtcNow.Year).ToList();

            for (int i = 0; i < 12; i++)
            {
                var internalI = i;

                var subTrainings = trainings.Where(t => t.DesiredStartDate.Month - 1 == internalI);
                var subjects = new Dictionary<string, int>();

                foreach (var subTraining in subTrainings)
                {
                    var key = subTraining.Subject.Name.ToLower();
                    if (!subjects.ContainsKey(key))
                    {
                        subjects.Add(key, 0);
                    }
                    var value = subjects[key];
                    subjects[key] = value + 1;
                }

                ret.Add(new TrainingStatistics()
                    {
                        MonthNr = i,
                        Subjects = subjects
                    });

            }

            return ret;
        }
    }
}