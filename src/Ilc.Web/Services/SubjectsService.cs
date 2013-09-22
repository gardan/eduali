using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Web.Models;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class SubjectsService : Service
    {

        public FilteredDataModel<SubjectModel> Get(FilterSubjectsParameters request)
        {
            return new FilteredDataModel<SubjectModel>()
                {
                    Data =  new List<SubjectModel>()
                        {
                            new SubjectModel() { Id = 1, Name = "Romanian" },
                            new SubjectModel() { Id = 2, Name = "English" }
                        },
                    TotalDisplayRecords = 2,
                    TotalRecords = 2
                };
        }
    }

    public class SubjectModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class FilterSubjectsParameters : FilterParametersBase
    {
    }
}