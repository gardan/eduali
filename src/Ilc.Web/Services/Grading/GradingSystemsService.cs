using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Web.InjectorConventions;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services.Grading
{
    public class GradingSystemsService : Service
    {
        public IUow Uow { get; set; }
        public IGradingSystemsService GradingSystems { get; set; }

        public FilteredResults<GradingSystemModel> Get(FilterParametersGradingSystems request)
        {
            var results = Uow.GradingSystems.GetAll().ToList();
            
            return new FilteredResults<GradingSystemModel>()
                {
                    Data = results.Select(s => new GradingSystemModel().InjectFrom<GradingSystemToWebModel>(s) as GradingSystemModel).ToList()
                };
        }

        public HttpResult Get(GradingSystemModel request)
        {
            var ret = GradingSystems.GetById(request.Id);
            
            return new HttpResult( new [] {new GradingSystemModel().InjectFrom<GradingSystemToWebModel>(ret) })
                {
                    StatusCode =  HttpStatusCode.OK
                };  
        }

        public HttpResult Post(GradingSystemModel request)
        {
            var gradingSystem = new GradingSystem().InjectFrom(request) as GradingSystem;

            GradingSystems.Create(gradingSystem);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Put(GradingSystemModel request)
        {
            var gradingSystem = GradingSystems.GetById(request.Id);
            gradingSystem.Name = request.Name;

            foreach (var grade in gradingSystem.Grades.ToArray())
            {
                if (!request.Grades.Exists(g => g.Id == grade.Id))
                {
                    Uow.Grades.Delete(grade);
                }
            }

            foreach (var gradeModel in request.Grades.Where(g => g.Id <= 0).ToArray())
            {
                gradingSystem.Grades.Add(new Grade()
                    {
                        Name = gradeModel.Name,
                        Order = 1
                    });
                request.Grades.Remove(gradeModel);
            }

            foreach (var gradeModel in request.Grades.Where(g => g.Id > 0).ToArray())
            {
                var grade = gradingSystem.Grades.First(g => g.Id == gradeModel.Id);
                grade.Order = gradeModel.Order + 1;
                grade.Name = gradeModel.Name;
                request.Grades.Remove(gradeModel);
            }


            GradingSystems.Update(gradingSystem);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };

        }

        public HttpResult Delete(GradingSystemModel request)
        {
            var relatedTrainingsExist = Uow.Trainings.GetAll().Any(t => t.GradingSystemId == request.Id);
            if (relatedTrainingsExist)
            {
                throw new ArgumentException("Grading system cannot be deleted because it is related with one or more trainings.");
            }

            GradingSystems.Delete(request.Id);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class GradingSystemModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public List<GradeModel> Grades { get; set; }
        public List<GradingAttributeModel> Attributes { get; set; }
    }

    public class GradingAttributeModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class GradeModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
    }

    public class FilterParametersGradingSystems : FilterArguments
    {
    }
}