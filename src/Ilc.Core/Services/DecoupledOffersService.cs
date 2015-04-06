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
    public class DecoupledOffersService : IDecoupledOffersService
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }

        public FilteredResults<Offer> GetFiltered(FilterArgumentsDecoupledOffer parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            parameters.Filter = parameters.Filter ?? new List<Filter>();

            var user = Users.GetByEmail();

            var query = Uow.DecoupledOffers.GetAll().Where(o => o.Customer.CompanyId == user.CompanyId);

            // filter by predefined queries
            

            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

            // search
            foreach (var filter in parameters.Filter)
            {
                var inFilter = filter;
                switch (filter.Field)
                {
                        // Doru
                    case "amount":
                        // query = query.Where(c => c.Amount.Equals(inFilter.Value));
                        break;
                    case "customer":
                        query = query.Where(c => c.Customer.Name.Contains(inFilter.Value));
                        break;
                    case "active":
                        if (inFilter.Value == "True")
                        {
                            query = query.Where(c => c.Active);
                        }
                        else
                        {
                            query = query.Where(c => !c.Active);
                        }
                        break;
                    case "accepted":
                        if (inFilter.Value == "True")
                        {
                            query = query.Where(c => c.Accepted);
                        }
                        else
                        {
                            query = query.Where(c => !c.Accepted);
                        }
                        break;
                    case "paymentDueAt":
                        //if (inFilter.Type == "date")
                        //{
                        //    DateTime dt = Convert.ToDateTime(inFilter.Value);
                        //    query.Where(c => c.PaymentDueAt > dt);
                        //}
                        //else { 
                        //}
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

            return new FilteredResults<Offer>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = totalDisplayRecords,
                TotalRecords = totalDisplayRecords
            };
        }

        public void Create(Offer newOffer)
        {
            Uow.DecoupledOffers.Add(newOffer);
            Uow.Commit();
        }

        public Offer GetById(int id)
        {
            return Uow.DecoupledOffers.GetById(id);
        }

        public void Update(Offer offer)
        {
            // Are there any other offers for these trainings?
            var currentOffers = this.GetByTrainingsId(offer.Trainings.ToList().Select(t => t.Id).ToList());
            // Is it Accepted?
                // It should also be Active
            if (offer.Accepted && !offer.Active) throw new Exception("Unable to update offer. Offer must be active in order to be accepted");
            
            if (currentOffers.Exists(o => (o.Active) && o.Id != offer.Id)) throw new Exception("Unable to update offer");

            // Is any of them active ?? 
                // Throw error


            Uow.DecoupledOffers.Update(offer);
            Uow.Commit();
        }

        public void Remove(Offer offer)
        {
            Uow.DecoupledOffers.Delete(offer);
            Uow.Commit();
        }

        private List<Offer> GetByTrainingsId(List<int> trainingsId)
        {
            return this.Uow.DecoupledOffers.GetAll()
                .Where(offer => offer.Trainings.Any(training => trainingsId.Contains(training.Id))).ToList();
        }
    }

    public interface IDecoupledOffersService
    {
        FilteredResults<Offer> GetFiltered(FilterArgumentsDecoupledOffer parameters);
        void Create(Offer newOffer);
        Offer GetById(int id);
        void Update(Offer offer);
        void Remove(Offer offer);
    }
}
