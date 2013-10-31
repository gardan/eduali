using System;
using System.Collections.Generic;
using System.Linq;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public class SubjectsService : ISubjectsService
    {
        public IUow Uow { get; set; }

        public FilteredResults<Subject> GetFiltered(FilterArguments parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            parameters.Filter = parameters.Filter ?? new List<Filter>();

            var query = Uow.Subjects.GetAll();
            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

            // search
            foreach (var filter in parameters.Filter)
            {
                var inFilter = filter;
                switch (filter.Field)
                {
                    case "name":
                        query = query.Where(c => c.Name.Contains(inFilter.Value));
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

            return new FilteredResults<Subject>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = totalDisplayRecords,
                TotalRecords = totalDisplayRecords
            };
        }

        public Subject GetById(int id)
        {
            throw new NotImplementedException();
        }

        public void Create(Subject newSubject)
        {
            Uow.Subjects.Add(newSubject);
            Uow.Commit();
        }

        public void Update(Subject updatedSubject)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}