using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Web.Models;
using Ilc.Web.Models.Student;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class StudentsInterviewService : Service
    {
        public ITrainingsService Trainings { get; set; }

        public FilteredDataModel<TrainingStudentInterviewModel> Get(TrainingStudentInterviewModel request)
        {
            var data = new List<TrainingStudentInterviewModel>();
            var training = Trainings.GetById(request.Id);
            var interviews = training.Interviews;

            var students = training.Students;
            foreach (var student in students)
            {
                var interview = interviews.FirstOrDefault(i => i.StudentId == student.Id);

                data.Add(new TrainingStudentInterviewModel()
                    {
                        Id = student.Id,
                        Name = student.Name,
                        InterviewId = interview == null ? 0 : interview.Id
                    });
            }

            return new FilteredDataModel<TrainingStudentInterviewModel>()
                {
                    Data = data
                };
        }

    }
}