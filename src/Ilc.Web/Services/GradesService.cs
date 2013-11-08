using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Omu.ValueInjecter;
using ServiceStack.ServiceInterface;

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
    }

    public class FilterParametersGrades : FilterArgumentsGrades
    {
    }
}