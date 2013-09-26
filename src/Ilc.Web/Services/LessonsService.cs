using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Web.Models;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;
using ServiceStack.Text;

namespace Ilc.Web.Services
{
    public class LessonsService : Service
    {
        public ITrainingsService Trainings { get; set; }

        public FilteredDataModel<LessonModel> Get(FilterParametersLessons request)
        {
            var training = Trainings.GetById(request.TrainingId);
            var offer = training.Offers.First();
            var totalStudents = training.Students.Count();


            var data = new List<LessonModel>();
            for (var i = 1; i <= offer.NoLessons; i++ )
            {
                var totalProgressEvaluations = training.ProgressEvaluations.Count(p => p.Order == i);
                

                data.Add(new LessonModel()
                    {
                        Id = i,
                        Name = "Lesson " + i,
                        ProgressEvaluationComplete = totalProgressEvaluations == totalStudents
                    });
            }

            var res = new FilteredDataModel<LessonModel>()
            {
                Data = data
            };

            return res;
        }

        public FilteredDataModel<LessonScheduleModel> Get(FilterParametersLessonSchedule request)
        {
            var training = Trainings.GetById(request.TrainingId);
            var scheduleDays = training.ScheduleDays;
            var data = new List<LessonScheduleModel>();

            foreach (var day in scheduleDays)
            {
                data.Add(new LessonScheduleModel()
                    {
                        StartDate = day.StartDate,
                        EndDate = day.EndDate,
                        Name = day.LessonName,
                        ResourceId = day.Order
                    });
            }

            return new FilteredDataModel<LessonScheduleModel>()
                {
                    Data = data
                };
        }
    }

    [DataContract]
    public class LessonScheduleModel
    {
        [DataMember(Name="ResourceId")]
        public int ResourceId { get; set; }
        [DataMember(Name = "Name")]
        public string Name { get; set; }
        [DataMember(Name = "StartDate")]
        public DateTimeOffset StartDate { get; set; }
        [DataMember(Name = "EndDate")]
        public DateTimeOffset EndDate { get; set; }
    }

    [DataContract]
    public class LessonModel
    {
        [DataMember(Name = "Id")]
        public int Id { get; set; }
        [DataMember(Name = "Name")]
        public string Name { get; set; }

        // This is just to remember how i can mix PascalCase and CamelCase 
        // property name when serializing.
        [DataMember(Name = "dummy")]
        public string Dummy { get; set; }

        [DataMember(Name = "LessonSchedules")]
        public List<LessonScheduleModel> LessonSchedules { get; set; }

        [DataMember]
        public bool ProgressEvaluationComplete { get; set; }
    }

    public class FilterParametersLessonSchedule : FilterParametersBase
    {
        public int TrainingId { get; set; }
    }

    public class FilterParametersLessons : FilterParametersBase
    {
        public int TrainingId { get; set; }
    }
}