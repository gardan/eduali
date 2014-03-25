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

namespace Ilc.Web.Services
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

            GradingSystems.DeleteSystemGrades(gradingSystem.Id);

            foreach (var gradeModel in request.Grades)
            {
                gradingSystem.Grades.Add(new Grade()
                    {
                        Name = gradeModel.Name,
                        Order = gradeModel.Order
                    });
            }

            GradingSystems.Update(gradingSystem);

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