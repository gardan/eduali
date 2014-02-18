﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Models;
using Ilc.Web.Filters.Request;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    [IlcAuth]
    public class SubjectsService : Service
    {

        public ISubjectsService Subjects { get; set; }

        // public FilteredDataModel<SubjectModel> Get(FilterSubjectsParameters request)
        public HttpResult Get(FilterSubjectsParameters request)
        {
            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.Unauthorized
                };
    
            // var results = Subjects.GetFiltered(request);
            // return new FilteredDataModel<SubjectModel>()
            //     {
            //         Data = results.Data.Select(s => new SubjectModel().InjectFrom(s) as SubjectModel).ToList(),
            //         TotalDisplayRecords = results.TotalDisplayRecords,
            //         TotalRecords = results.TotalRecords
            //     };
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