using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core;
using Ilc.Data.Models;
using Ilc.Infrastructure.Contracts;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class TemplatesService : Service
    {
        public IAvailabilityTemplatesService Templates { get; set; }

        public FilteredDataModel<TemplateModel> Get(FilterParametersTemplates request)
        {
            var data = Templates.GetFiltered(request);

            return new FilteredDataModel<TemplateModel>()
                {
                    Data = data.Data.Select(t => new TemplateModel().InjectFrom<TemplateToTemplateModel>(t) as TemplateModel).ToList(),
                    TotalDisplayRecords = data.TotalDisplayRecords,
                    TotalRecords = data.TotalRecords
                };
        }

        public HttpResult Put(TemplateModel request)
        {
            var template = Templates.GetById(request.Id);
            template = template.InjectFrom<TemplateModelToTemplate>(request) as Template;
            
            Templates.Update(template);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Post(TemplateModel request)
        {
            var template = new Template().InjectFrom<TemplateModelToTemplate>(request) as Template;

            Templates.Create(template);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.Created
                };
        }
    }


    public class TemplateModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public TemplateDayModel[] TemplateDays { get; set; }
    }

    public class TemplateDayModel
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public bool OffDay { get; set; }
    }

    public class FilterParametersTemplates : FilterArgumentsTemplates
    {
    }
}