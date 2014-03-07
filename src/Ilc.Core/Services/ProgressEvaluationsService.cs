using System;
using System.Collections.Generic;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class ProgressEvaluationsService : IProgressEvaluationsService
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }

        public FilteredResults<ProgressEvaluation> GetFiltered(FilterArgumentsProgressEvaluations parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            parameters.Filter = parameters.Filter ?? new List<Filter>();

            // var user = Users.GetByEmail();
            var query = Uow.ProgressEvaluations.GetAll().Where(p => p.TrainingId == parameters.TrainingId);

            // predefined filtering 
            if (parameters.LessonId > 0)
            {
                query = query.Where(p => p.TrainingScheduleDayId == parameters.LessonId);
            }
            if (parameters.StudentId > 0)
            {
                query = query.Where(p => p.StudentId == parameters.StudentId);
            }

            var totalResults = query.Count();
            // search
            foreach (var filter in parameters.Filter)
            {
                var inFilter = filter;
                switch (filter.Field)
                {
                    case "id":
                        var id = Convert.ToInt32(inFilter.Value);
                        query = query.Where(c => c.Id == id);
                        break;
                    default:
                        // if trying to search for unavalable column, just exit
                        // TODO: log this shit.
                        break;
                }
            }

            var totalDisplayRecords = query.Count();

            // order
            query = query.OrderBy(e => e.Id);

            // paging
            query = query.Skip(parameters.StartIndex).Take(parameters.Length);

            return new FilteredResults<ProgressEvaluation>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = totalDisplayRecords,
                TotalRecords = totalResults
            };
        }

        public ProgressEvaluation GetById(int id)
        {
            return Uow.ProgressEvaluations.GetById(id);
        }

        public void Update(ProgressEvaluation evaluation)
        {
            Uow.ProgressEvaluations.Update(evaluation);
            Uow.Commit();
        }
    }
}