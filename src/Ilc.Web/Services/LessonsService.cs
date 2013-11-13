using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using Ilc.Core;
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
            var offer = training.Offers.First(o => o.Selected);
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

        public FilteredDataModel<LessonScheduleModelNormal> Get(FilterParametersLessonsSchedule request)
        {
            var trainings = Trainings.GetFilteredTrainings(new FilterArguments());
            var data = new List<LessonScheduleModelNormal>();
            var id = 1;

            foreach (var training in trainings.Data)
            {
                var scheduleDays = training.ScheduleDays;
               

                foreach (var day in scheduleDays)
                {
                    data.Add(new LessonScheduleModelNormal()
                    {
                        Id = id++,
                        StartDate = day.StartDate,
                        EndDate = day.EndDate,
                        Name = day.LessonName,
                        ResourceId = training.TrainerId ?? 0, // This must be the trainerId
                        Color = "#4ADAF7"
                    });
                }
            }



            return new FilteredDataModel<LessonScheduleModelNormal>()
            {
                Data = data
            };
        }
    }

    public class LessonScheduleModelNormal
    {
        public int Id { get; set; }
        public int ResourceId { get; set; }
        public string Name { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public string Color { get; set; }
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

    public class FilterParametersLessonsSchedule : FilterParametersBase
    {
    }

    public class FilterParametersLessons : FilterParametersBase
    {
        public int TrainingId { get; set; }
    }
}