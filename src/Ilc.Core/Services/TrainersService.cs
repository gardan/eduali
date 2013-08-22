﻿using System;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class TrainersService : ITrainersService
    {
        public IUow Uow { get; set; }

        public FilteredResults<Trainer> GetFiltered(FilterArguments parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;

            var query = Uow.Trainers.GetAll();
            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

            // filter
            foreach (var filter in parameters.Filter)
            {
                var inFilter = filter;
                switch (filter.Field)
                {
                    case "name":
                        query = query.Where(t => t.Name.Contains(inFilter.Value));
                        break;
                    case "phone":
                        query = query.Where(t => t.Phone.Contains(inFilter.Value));
                        break;
                    default:
                        // TODO: Log this!!
                        break;
                }
            }

            // order
            query = query.OrderBy(e => e.Id);

            // paging
            query = query.Skip(parameters.StartIndex).Take(parameters.Length);

            return new FilteredResults<Trainer>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = totalDisplayRecords,
                TotalRecords = totalDisplayRecords
            };
        }

        public Trainer GetByTrainerId(int id)
        {
            return Uow.Trainers.GetById(id);
        }

        public void Create(Trainer newTrainer)
        {
            Uow.Trainers.Add(newTrainer);
            Uow.Commit();
        }

        public void Update(Trainer updateTrainer)
        {
            Uow.Trainers.Update(updateTrainer);
            Uow.Commit();
        }

        public void Delete(int id)
        {
            Uow.Trainers.Delete(id);
            Uow.Commit();
        }
    }
}