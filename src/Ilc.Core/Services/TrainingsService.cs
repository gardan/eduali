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

            foreach (var filter in parameters.Filter)
            {
                var inFilter = filter;
                switch (inFilter.Field)
                {
                    case "status":
                        query = query.Where(t => t.Status == inFilter.Value);
                        break;

                    case "customer":
                        query = query.Where(t => t.Customer.Name == inFilter.Value);
                        break;
                    case "trainer":
                        query = query.Where(t => t.Trainer.Name == inFilter.Value);
                        break;
                    case "subject":
                        query = query.Where(t => t.Subject.Name == inFilter.Value);
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
    }
}