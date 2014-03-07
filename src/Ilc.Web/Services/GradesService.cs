using System.Collections.Generic;
using System.Linq;
using System.Net;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class GradesService : Service
    {
        public IGradesService Grades { get; set; }

        public FilteredResults<GradeModel> Get(FilterParametersGrades request)
        {
            var results = Grades.GetFiltered(request);

            return new FilteredResults<GradeModel>()
                {
                    Data = results.Data.Select(g => new GradeModel().InjectFrom(g) as GradeModel).ToList(),
                    TotalDisplayRecords = results.TotalDisplayRecords,
                    TotalRecords = results.TotalRecords
                };
        }

        public HttpResult Post(CreateGradeModel request)
        {
            var grades = new List<Grade>();

            if (request.Grades.Length == 0)
            {
                var grade = new Grade().InjectFrom(request) as Grade;
                grades.Add(grade);
            }
            else
            {
                grades.AddRange(request.Grades.Select(createGradeModel => new Grade().InjectFrom(request) as Grade));
            }

            foreach (var grade in grades)
            {
                Grades.Create(grade);
            }

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class CreateGradeModel
    {
        public CreateGradeModel()
        {
            Grades = new CreateGradeModel[0];
        }
        public string Name { get; set; }
        public int Order { get; set; }
        public int GradingSystemId { get; set; }

        public CreateGradeModel[] Grades { get; set; }
    }

    public class FilterParametersGrades : FilterArgumentsGrades
    {
    }
}