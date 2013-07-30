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

        public Student GetByStudentId(int id)
        {
            return Uow.Students.GetById(id);
        }

        public void Create(Student newStudent)
        {
            Uow.Students.Add(newStudent);
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
