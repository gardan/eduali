using System.Linq;
using System.Net;
using Ilc.Core.Contracts;
using Ilc.Data.Models;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.Common;
using ServiceStack.Common.Web;
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


        public HttpResult Post(CreateStudentModel request)
        {
            var newStudent = new Student().InjectFrom(request) as Student;

            Students.Create(newStudent);

            var returnModel = new StudentModel().InjectFrom<StudentToStudentModel>(newStudent);

            return new HttpResult(returnModel)
                {
                    StatusCode = HttpStatusCode.Created,
                    Location = Request.AbsoluteUri.CombineWith(newStudent.Id)
                };
        }

        public HttpResult Put(EditStudentModel request)
        {
            var updatedStudent = new Student()
                {
                    Name = request.Name,
                    CustomerId = request.CustomerId,
                    Id = request.Id
                };

            Students.Update(updatedStudent);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Delete(DeleteStudentModel request)
        {
            Students.Delete(request.Id);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }
}