using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using ServiceStack;

namespace Ilc.Web.Services.Trainings
{
    public class StudentsToTrainingsService : Service
    {
        public IUow Uow { get; set; }

        public HttpResult Post(AddStudentsToTrainingsModel request)
        {
            var training = Uow.Trainings.GetById(request.TrainingId);
            var studentsToAdd = new List<Student>();
            var justLoad = training.Students;

            foreach (var studentId in request.Students)
            {
                var student = Uow.Students.GetAll().FirstOrDefault(s => s.Id == studentId);
                studentsToAdd.Add(student);
            }
            foreach (var userProfile in studentsToAdd)
            {
                training.Students.Add(userProfile);
            }

            Uow.Trainings.Update(training);
            Uow.Commit();

            var result = studentsToAdd.Map(s => s.Id);

            return new HttpResult(result)
            {
                StatusCode = HttpStatusCode.Created
            };
        }
    }

    [Route("/trainings/students", "POST")]
    public class AddStudentsToTrainingsModel
    {
        public int TrainingId { get; set; }
        public int[] Students { get; set; }
    }
}