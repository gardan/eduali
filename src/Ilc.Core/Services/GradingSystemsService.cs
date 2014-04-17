using System;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class GradingSystemsService : IGradingSystemsService
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }

        public void Create(GradingSystem gradingSystem)
        {
            var user = Users.GetByEmail();
            gradingSystem.CompanyId = user.CompanyId;

            Uow.GradingSystems.Add(gradingSystem);
            Uow.Commit();
        }



        public void Update(GradingSystem gradingSystem)
        {
            Uow.GradingSystems.Update(gradingSystem);
            Uow.Commit();
        }

        public GradingSystem GetById(int id)
        {
            return Uow.GradingSystems.GetById(id);
        }

        public void DeleteSystemGrades(int id)
        {
            var gradesToDelete = Uow.Grades.GetAll().Where(g => g.GradingSystemId == id);
            foreach (var grade in gradesToDelete.ToList())
            {
                Uow.Grades.Delete(grade);
            }
            Uow.Commit();
        }

        public void Delete(int id)
        {
            Uow.GradingSystems.Delete(id);
            Uow.Commit();
        }
    }
}