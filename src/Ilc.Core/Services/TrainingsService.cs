using System;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using LinqKit;

namespace Ilc.Core.Services
{
    public class TrainingsService : ITrainingsService
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }

        public FilteredResults<Training> GetFilteredTrainings(FilterArguments parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 100 : parameters.Length;

            var user = Users.GetByEmail();
            var query = Uow.Trainings.GetAll().Where(t => t.Customer.CompanyId == user.CompanyId);

            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

            // Filtering
            foreach (var filter in parameters.Filter)
            {
                var inFilter = filter;
                switch (inFilter.Field)
                {
                    case "id":
                        var id = Convert.ToInt32(inFilter.Value);
                        query = query.Where(t => t.Id == id);
                        break;
                    case "statusFriendlyName":
                        // http://www.albahari.com/nutshell/predicatebuilder.aspx
                        var statusDefinitions = Uow.StatusDictionary.GetAll().Where(s => s.FriendlyName.Contains(inFilter.Value)).ToList();
                        
                        var predicate = PredicateBuilder.False<Training>();

                        foreach (var statusDefinition in statusDefinitions)
                        {
                            string temp = statusDefinition.Name;
                            predicate = predicate.Or(t => t.Status.Contains(temp));
                        }
                        query = query.AsExpandable().Where(predicate);
                        break;
                    case "customer":
                        query = query.Where(t => t.Customer.Name.Contains(inFilter.Value));
                        break;
                    case "trainer":
                        query = query.Where(t => t.Trainer.Name.Contains(inFilter.Value));
                        break;
                    case "subject":
                        query = query.Where(t => t.Subject.Name.Contains(inFilter.Value));
                        break;
                    default:
                        break;
                }
            }
            
            // order
            query = query.OrderBy(e => e.Id);

            // paging
            query = query.Skip(parameters.StartIndex).Take(parameters.Length);

            return new FilteredResults<Training>()
                {
                    Data = query.ToList(),
                    TotalDisplayRecords = totalDisplayRecords,
                    TotalRecords = totalDisplayRecords
                };
        }

        public Training GetById(int id)
        {
            return Uow.Trainings.GetById(id);
        }

        public void Create(Training newTraining)
        {
            // add a random color
            newTraining.Color = "#" + Misc.Utils.GetRandomHexString(6);

            // Create the number of customer training
            newTraining.NoOfCustomerTraining = GetNoOfNewCustomerTraining(newTraining.CustomerId.GetValueOrDefault());

            // add the empty spendings object
            newTraining.Spendings = new Spendings();

            Uow.Trainings.Add(newTraining);
            Uow.Commit();
        }

        public void Update(Training updateTraining)
        {
            Uow.Trainings.Update(updateTraining);
            Uow.Commit();
        }

        public void Delete(int id)
        {
            Uow.Trainings.Delete(id);
            Uow.Commit();
        }

        /// <remarks>
        /// This function is not really safe, if two trainings get created, for the same customer, at the exact same time, 
        /// they could end up with the same NoOfCustomerTraining.
        /// </remarks>
        private int GetNoOfNewCustomerTraining(int customerId)
        {
            var customer = Uow.Customers.GetById(customerId);
            if (customer == null)
            {
                var training = Uow.Trainings.GetAll().OrderByDescending(t => t.Id).FirstOrDefault(t => t.Public);
                if (training == null) return 1;
                return training.NoOfCustomerTraining + 1;
            }

            if (customer.Trainings.Count == 0) return 1;

            return customer.Trainings.LastOrDefault().NoOfCustomerTraining + 1;
        }
    }
}