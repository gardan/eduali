using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class OffersService : IOffersService
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }

        public FilteredResults<TrainingOffer> GetFiltered(FilterArgumentsOffers parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            parameters.Filter = parameters.Filter ?? new List<Filter>();

            var query = Uow.Offers.GetAll();
            
            // filter by predefined queries
            if (parameters.TrainingId > 0)
            {
                query = query.Where(o => o.TrainingId == parameters.TrainingId);
            }

            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

            // search
            foreach (var filter in parameters.Filter)
            {
                //var inFilter = filter;
                //switch (filter.Field)
                //{
                //    case "name":
                //        query = query.Where(c => c.Name.Contains(inFilter.Value));
                //        break;
                //    case "contactPerson":
                //        query = query.Where(c => c.ContactPersons.FirstOrDefault(cp => cp.IsMain).Name.Contains(inFilter.Value));
                //        break;
                //    case "bankAccount":
                //        query = query.Where(c => c.BankAccount.Contains(inFilter.Value));
                //        break;
                //    default:
                //        // if trying to search for unavalable column, just exit
                //        // TODO: log this shit.
                //        break;
                //}
            }

            // order
            query = query.OrderBy(e => e.Id);

            // paging
            query = query.Skip(parameters.StartIndex).Take(parameters.Length);

            return new FilteredResults<TrainingOffer>()
                            {
                                Data = query.ToList(),
                                TotalDisplayRecords = totalDisplayRecords,
                                TotalRecords = totalDisplayRecords
                            };
        }

        public TrainingOffer GetById(int id)
        {
            return Uow.Offers.GetById(id);
        }

        public void Create(TrainingOffer newOffer)
        {
            // timestamps
            // TODO: this should be moved to a generic method that takes a StampedEntity as a parameter, stamps it, and returns it.
            newOffer.Creator = Users.GetByEmail();
            newOffer.CreateDate = DateTimeOffset.UtcNow;

            Uow.Offers.Add(newOffer);
            Uow.Commit();
        }

        public void Update(TrainingOffer updatedOffer)
        {
            Uow.Offers.Update(updatedOffer);
            Uow.Commit();
        }

        public void Delete(int id)
        {
            Uow.Offers.Delete(id);
            Uow.Commit();
        }
    }
}
