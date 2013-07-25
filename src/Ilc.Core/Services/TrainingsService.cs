using System;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class TrainingsService : ITrainingsService
    {
        public IUow Uow { get; set; }

        public FilteredResults<Training> GetFilteredTrainings(FilterArguments parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;

            var query = Uow.Trainings.GetAll();
            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

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

        public void Create(Training newTraining)
        {
            Uow.Trainings.Add(newTraining);
            Uow.Commit();
        }
    }
}