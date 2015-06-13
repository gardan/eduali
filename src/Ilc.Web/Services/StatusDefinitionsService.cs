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
    public class StatusDefinitionsService : BaseService
        <CreateStatusDefinitionModel, 
        StatusDefinitionUpdateModel, 
        StatusDefinitionUpdateModel,
        FilterStatusDefinitionsParameters,
        StatusDictionary,
        StatusDefinionModel>
    {
        public override HttpResult Delete(StatusDefinitionUpdateModel request)
        {
            if (Uow.Trainings.GetAll().Any(t => t.StatusId == request.Id))
            {
                throw new HttpError(HttpStatusCode.MethodNotAllowed, "Status belongs to a training. Please remove this status from all the trainings, then try again.");
            }
            return base.Delete(request);
        }
    }

    [Route("/statusDefinitions", "POST")]
    public class CreateStatusDefinitionModel
    {
        public string Name { get; set; }
        public int Weight { get; set; }
    }

    public class StatusDefinitionUpdateModel : BaseRequestModel
    {
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