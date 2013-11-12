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

        public FilteredResults<Training> GetFilteredTrainings(FilterArguments parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;

            var query = Uow.Trainings.GetAll();
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