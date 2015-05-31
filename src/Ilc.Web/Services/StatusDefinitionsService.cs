using System.Linq;
using System.Net;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class StatusDefinitionsService : Service
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }
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

        public HttpResult Post(CreateStatusDefinitionModel request)
        {
            var newStatus = new StatusDictionary().InjectFrom(request) as StatusDictionary;
            newStatus.CompanyId = Users.GetByEmail().CompanyId;

            Uow.StatusDictionary.Add(newStatus);
            Uow.Commit();

            return new HttpResult()
            {
                StatusCode = HttpStatusCode.Created
            };
        }

        public HttpResult Delete(StatusDefinitionUpdateModel request)
        {
            var status = Uow.StatusDictionary.GetById(request.Id);

            if (Uow.Trainings.GetAll().Any(t => t.StatusId == status.Id))
            {
                throw new HttpError(HttpStatusCode.MethodNotAllowed, "Status belongs to a training. Please remove this status from all the trainings, then try again.");
            }

            Uow.StatusDictionary.Delete(status);
            Uow.Commit();
            
            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };

        }
    }

    [Route("/statusDefinitions", "POST")]
    public class CreateStatusDefinitionModel
    {
        public string Name { get; set; }
        public int Weight { get; set; }
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