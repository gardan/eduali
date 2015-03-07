using System.Linq;
using System.Net;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Models;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class StatusDefinitionsService : Service
    {
        public IStatusDefinitionsService StatusDefinitions { get; set; }

        public FilteredDataModel<StatusDefinionModel> Get(FilterStatusDefinitionsParameters request)
        {
            var results = StatusDefinitions.GetFiltered(request);
            return new FilteredDataModel<StatusDefinionModel>()
                {
                    Data = results.Data.Select(s => new StatusDefinionModel().InjectFrom(s) as StatusDefinionModel).ToList(),
                    TotalDisplayRecords = results.TotalDisplayRecords,
                    TotalRecords = results.TotalRecords
                };
        }

        public HttpResult Put(StatusDefinitionUpdateModel request)
        {
            var statusDefinition = StatusDefinitions.GetById(request.Id).InjectFrom(request) as StatusDictionary;
            
            StatusDefinitions.Update(statusDefinition);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class StatusDefinitionUpdateModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Weight { get; set; }
    }

    public class StatusDefinionModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Weight { get; set; }
    }

    public class FilterStatusDefinitionsParameters : FilterArgumentsStatusDefinitions { }
}