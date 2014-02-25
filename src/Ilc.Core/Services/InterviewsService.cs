using System;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class InterviewsService : IInterviewsService
    {
        public IUow Uow { get; set; }

        public FilteredResults<StudentInterview> GetFiltered(FilterArgumentsInterviews arguments)
        {
            // Should only return one, don't bother with paging and filtering.
            var query = Uow.Interviews.GetAll().Where(i => i.TrainingId == arguments.TrainingId && i.StudentId == arguments.StudentId);

            return new FilteredResults<StudentInterview>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = query.Count(),
                TotalRecords = query.Count()
            };
        }

        public StudentInterview GetById(int id)
        {
            return Uow.Interviews.GetById(id);
        }

        public void Update(StudentInterview interview)
        {
            Uow.Interviews.Update(interview);
            Uow.Commit();
        }
    }
}