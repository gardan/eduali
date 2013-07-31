using System;
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
