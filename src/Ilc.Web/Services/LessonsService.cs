using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Web.Models;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;
using ServiceStack.Text;

namespace Ilc.Web.Services
{
    public class LessonsService : Service
    {
        public ITrainingsService Trainings { get; set; }
        public IUow Uow { get; set; }

        public FilteredDataModel<LessonModel> Get(FilterParametersLessons request)
        {
            var training = Trainings.GetById(request.TrainingId);
            var totalStudents = training.Students.Count();
            var lessons = training.ScheduleDays;

            var data = new List<LessonModel>();
            var z = 0;
            foreach (var trainingScheduleDay in lessons)
            {
                z++;

                var totalProgressEvaluations = training.ProgressEvaluations.Count(p => p.Order == trainingScheduleDay.Id);


                data.Add(new LessonModel()
                {
                    Id = trainingScheduleDay.Id,
                    Name = trainingScheduleDay.LessonName,
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

            // Get the trainings schedule days, if any exist
            foreach (var day in scheduleDays)
            {
                data.Add(new LessonScheduleModel()
                    {
                        Id = day.Id,
                        StartDate = day.StartDate.DateTime,
                        EndDate = day.EndDate.DateTime,
                        Name = day.LessonName,
                        ResourceId = training.TrainerId.GetValueOrDefault(),
                        // day.Order, // this has to be the trainerId
                        Resizable = true,
                        Draggable = true
                    });
            }

            // Get the other scheduled lessons, for overlaying purposes
            if (request.Overlay)
            {
                var trainings =
                    Uow.Trainings.GetAll().Where(t => t.TrainerId == training.TrainerId && t.Id != training.Id).ToList();

                foreach (var nonRelatedTraining in trainings)
                {
                    foreach (var day in nonRelatedTraining.ScheduleDays)
                    {
                        data.Add(new LessonScheduleModel()
                            {
                                Id = day.Id,
                                StartDate = day.StartDate.DateTime,
                                EndDate = day.EndDate.DateTime,
                                Name = day.LessonName,
                                ResourceId = training.TrainerId.GetValueOrDefault(), // day.Order,
                                Resizable = false,
                                Draggable = false,
                                Cls = "disabled "
                            });
                    }
                }
            }

            return new FilteredDataModel<LessonScheduleModel>()
                {
                    Data = data
                };
        }

        public FilteredDataModel<LessonScheduleModelNormal> Get(FilterParametersLessonsSchedule request)
        {
            var trainings = Trainings.GetFilteredTrainings(new FilterArgumentsTrainings());
            var data = new List<LessonScheduleModelNormal>();
            var id = 1;

            foreach (var training in trainings.Data)
            {
                var scheduleDays = training.ScheduleDays;


                foreach (var day in scheduleDays)
                {
                    data.Add(new LessonScheduleModelNormal()
                        {
                            Id = day.Id,
                            StartDate = day.StartDate.DateTime,
                            EndDate = day.EndDate.DateTime,
                            Name = day.LessonName,
                            ResourceId = training.TrainerId ?? 0, // This must be the trainerId
                            Color = training.Color,
                            CustomerName = training.Customer == null ? "" : training.Customer.Name,
                            SubjectName = training.Subject.Name,
                            TrainingId = training.Id
                        });
                }
            }



            return new FilteredDataModel<LessonScheduleModelNormal>()
                {
                    Data = data
                };
        }

        public HttpResult Put(UpdateLessonModel request)
        {
            var scheduleDay = Uow.TrainingScheduleDays.GetAll().FirstOrDefault(s => s.Id == request.Id);

            scheduleDay.StartDate = new DateTimeOffset(request.StartDate, TimeSpan.Zero);
            scheduleDay.EndDate = new DateTimeOffset(request.EndDate, TimeSpan.Zero);
            scheduleDay.LessonName = request.LessonName;

            Uow.TrainingScheduleDays.Update(scheduleDay);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Delete(UpdateLessonModel request)
        {
            Uow.TrainingScheduleDays.Delete(request.Id);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Post(UpdateLessonModel request)
        {
            var scheduleDay = new TrainingScheduleDay();
            scheduleDay.StartDate = new DateTimeOffset(request.StartDate, TimeSpan.Zero);
            scheduleDay.EndDate = new DateTimeOffset(request.EndDate, TimeSpan.Zero);
            scheduleDay.TrainingId = request.TrainingId;
            scheduleDay.LessonName = request.LessonName;

            Uow.TrainingScheduleDays.Add(scheduleDay);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.Created
                };
        }
    }

    public class UpdateLessonModel
    {
        public int Id { get; set; }
        public int TrainingId { get; set; }
        public DateTime StartDate { get; set; }
        public string LessonName { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class LessonScheduleModelNormal
    {
        public int Id { get; set; }
        public int ResourceId { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Color { get; set; }
        public string CustomerName { get; set; }
        public string SubjectName { get; set; }
        public int TrainingId { get; set; }
    }

    [DataContract]
    public class LessonScheduleModel
    {
        [DataMember(Name = "Id")]
        public int Id { get; set; }
        [DataMember(Name="ResourceId")]
        public int ResourceId { get; set; }
        [DataMember(Name = "Name")]
        public string Name { get; set; }
        [DataMember(Name = "StartDate")]
        public DateTime StartDate { get; set; }
        [DataMember(Name = "EndDate")]
        public DateTime EndDate { get; set; }

        [DataMember(Name = "Resizable")]
        public bool Resizable { get; set; }
        
        [DataMember(Name = "Draggable")]
        public bool Draggable { get; set; }

        [DataMember(Name = "Cls")]
        public string Cls { get; set; }
    }

    [DataContract]
    public class LessonModel
    {
        [DataMember(Name = "Id")]
        public int Id { get; set; }
        [DataMember(Name = "Name")]
        public string Name { get; set; }

        // This is just to remember how i can mix PascalCase and camelCase 
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
        public FilterParametersLessonSchedule()
        {
            Overlay = true;
        }

        public int TrainingId { get; set; }
        public bool Overlay { get; set; }
    }

    public class FilterParametersLessonsSchedule : FilterParametersBase
    {
    }

    public class FilterParametersLessons : FilterParametersBase
    {
        public int TrainingId { get; set; }
    }
}