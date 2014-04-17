using System;
using System.Collections.Generic;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class SubjectsService : ISubjectsService
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }

        public FilteredResults<Subject> GetFiltered(FilterArgumentsSubjects parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            parameters.Filter = parameters.Filter ?? new List<Filter>();

            var user = Users.GetByEmail();
            var query = Uow.Subjects.GetAll().Where(s => s.CompanyId == user.CompanyId);
            
            // predefined search
            // This searches for subjects that belong or not, to a trainer.
            // e.g. You want all the subjects that a trainer has.
            // e.g. You want all the subjects that a trainer does NOT have.
            if (parameters.TrainerId > 0)
            {
                if (parameters.Assigned)
                {
                    query = query.Where(s => s.Trainers.Any(t => t.Id == parameters.TrainerId));
                }
                else
                {
                    query = query.Where(s => s.Trainers.All(t => t.Id != parameters.TrainerId));
                }

            }

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

            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

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
            return Uow.Subjects.GetById(id);
        }

        public void Create(Subject newSubject)
        {
            var user = Users.GetByEmail();
            newSubject.CompanyId = user.CompanyId;

            Uow.Subjects.Add(newSubject);
            Uow.Commit();
        }

        public void Update(Subject updatedSubject)
        {
            Uow.Subjects.Update(updatedSubject);
            Uow.Commit();
        }

        public void Delete(int id)
        {
            Uow.Subjects.Delete(id);
            Uow.Commit();
        }
    }
}