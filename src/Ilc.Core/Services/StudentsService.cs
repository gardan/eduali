using System;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class StudentsService : IStudentsService
    {
        public IUow Uow { get; set; }

        public FilteredResults<Student> GetFiltered(FilterArgumentsStudents parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;

            var query = Uow.Students.GetAll();
            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

            // filter
            if (parameters.CustomerId > 0)
            {
                query = query.Where(s => s.CustomerId == parameters.CustomerId);
            }
            foreach (var filter in parameters.Filter)
            {
                var inFilter = filter;
                switch (filter.Field)
                {
                    case "name":
                        query = query.Where(s => s.Name.Contains(inFilter.Value));
                        break;
                    case "customer":
                        query = query.Where(s => s.Customer.Name.Contains(inFilter.Value));
                        break;  
                    default:
                        // TODO: log that no such field exists.
                        break;
                }
            }

            // order
            query = query.OrderBy(e => e.Id);

            // paging
            query = query.Skip(parameters.StartIndex).Take(parameters.Length);

            return new FilteredResults<Student>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = totalDisplayRecords,
                TotalRecords = totalDisplayRecords
            };
        }

        public Student GetByStudentId(int id)
        {
            return Uow.Students.GetById(id);
        }

        public void Create(Student newStudent)
        {
            Uow.Students.Add(newStudent);
            newStudent.Customer = Uow.Customers.GetById(newStudent.CustomerId);
            Uow.Commit();
        }

        public void Update(Student updateStudent)
        {
            Uow.Students.Update(updateStudent);
            Uow.Commit();
        }

        public void Delete(int id)
        {
            Uow.Students.Delete(id);
            Uow.Commit();
        }
    }
}
