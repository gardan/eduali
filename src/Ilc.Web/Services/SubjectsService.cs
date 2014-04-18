using System;
using System.Linq;
using System.Net;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Models;
using Ilc.Web.Filters.Request;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services
{
    [IlcAuth]
    public class SubjectsService : Service
    {

        public ISubjectsService Subjects { get; set; }

        public FilteredDataModel<SubjectModel> Get(FilterSubjectsParameters request)    
        {
            var results = Subjects.GetFiltered(request);
            return new FilteredDataModel<SubjectModel>()
                {
                    Data = results.Data.Select(s => new SubjectModel().InjectFrom(s) as SubjectModel).ToList(),
                    TotalDisplayRecords = results.TotalDisplayRecords,
                    TotalRecords = results.TotalRecords
                };
        }

        public HttpResult Post(SubjectModel request)
        {
            var subject = new Subject().InjectFrom(request) as Subject;

            Subjects.Create(subject);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Put(SubjectModel request)
        {
            var subject = Subjects.GetById(request.Id);
            subject.InjectFrom(request);

            Subjects.Update(subject);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Delete(SubjectModel request)
        {
            // TODO: put in request attribute
            var subject = Subjects.GetById(request.Id);
            if (subject.Trainers.Any())
            {
                throw new ArgumentException("Subject belongs to trainers.");
            }

            Subjects.Delete(request.Id);

            return new HttpResult()
            {
                StatusCode = HttpStatusCode.OK
            };
        }
    }

    public class SubjectModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class FilterSubjectsParameters : FilterArgumentsSubjects
    {
    }
}