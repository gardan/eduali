using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core.Contracts;
using Ilc.Core.Helpers;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class OffersService : IOffersService
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }
        public IStamper Stamper { get; set; }

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
                var inFilter = filter;
                switch (filter.Field)
                {
                    case "price":
                        // Doru
                        query = query.Where(z => z.Price.ToString().Contains(inFilter.Value));
                        break;

                    default:
                        // if trying to search for unavalable column, just exit
                        // TODO: log this shit.
                        break;
                }
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
            Stamper.Stamp(newOffer);

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
