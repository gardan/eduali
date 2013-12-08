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
            var assesments = training.Assesments;

            var students = training.Students;
            foreach (var student in students)
            {
                var interview = interviews.FirstOrDefault(i => i.StudentId == student.Id);
                var assesment = assesments.FirstOrDefault(a => a.StudentId == student.Id);

                data.Add(new TrainingStudentInterviewModel()
                    {
                        Id = student.Id,
                        Name = student.UserProfile.UserDetails.FirstName + " " + student.UserProfile.UserDetails.LastName,
                        InterviewId = interview == null ? 0 : interview.Id,
                        AssesmentId = assesment == null ? 0 : assesment.Id    
                    });
            }

            return new FilteredDataModel<TrainingStudentInterviewModel>()
                {
                    Data = data
                };
        }

    }

    public class StudentsProgressEvaluationService : Service
    {
        public ITrainingsService Trainings { get; set; }

        public FilteredDataModel<TrainingStudentInterviewModel> Get(FilterParameterProgressEvaluations request)
        {
            var data = new List<TrainingStudentInterviewModel>();
            var training = Trainings.GetById(request.TrainingId);
            var progressEvaluations = training.ProgressEvaluations.Where( p => p.Order == request.LessonId).ToList();

            var students = training.Students;
            foreach (var student in students)
            {
                var evaluation = progressEvaluations.FirstOrDefault(i => i.StudentId == student.Id);

                data.Add(new TrainingStudentInterviewModel()
                {
                    Id = student.Id,
                    Name = student.Name,
                    ProgressEvaluationId = evaluation == null ? 0 : evaluation.Id
                });
            }

            return new FilteredDataModel<TrainingStudentInterviewModel>()
            {
                Data = data
            };
        }
    }

    public class FilterParameterProgressEvaluations : FilterParametersBase
    {
        public int TrainingId { get; set; }
        public int LessonId { get; set; }
    }
}