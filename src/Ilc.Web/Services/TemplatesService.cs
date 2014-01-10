using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core;
using Ilc.Infrastructure.Contracts;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
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