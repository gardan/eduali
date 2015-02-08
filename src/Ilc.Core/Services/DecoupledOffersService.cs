﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class DecoupledOffersService : IDecoupledOffersService
    {
        public IUow Uow { get; set; }

        public FilteredResults<Offer> GetFiltered(FilterArgumentsDecoupledOffer parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            parameters.Filter = parameters.Filter ?? new List<Filter>();

            var query = Uow.DecoupledOffers.GetAll();

            // filter by predefined queries
            

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
