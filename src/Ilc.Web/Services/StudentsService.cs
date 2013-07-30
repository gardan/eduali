using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class StudentsService : Service
    {
        public IStudentsService Students { get; set; }

        public FilteredDataModel<StudentModel> Get(FilterParametersStudents request)
        {
            var results = Students.GetFiltered(request);

            return new FilteredDataModel<StudentModel>()
                {
                    TotalDisplayRecords = results.TotalDisplayRecords,
                    TotalRecords = results.TotalRecords,
                    Data = results.Data.Select(s => new StudentModel().InjectFrom<StudentToStudentModel>(s) as StudentModel).ToList()
                };
        }
    }
}