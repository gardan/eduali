using Ilc.Infrastructure.Contracts;
using Ilc.Web.Models;
using Ilc.Web.Services;
using Ilc.Web.Services.Tasks.Training;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Filters.Response
{
    public class TaskModelWithStatusResponseFilter : ResponseFilterAttribute
    {
        public IStatusService StatusService { get; set; }

        public override void Execute(IHttpRequest req, IHttpResponse res, object responseDto)
        {
            var response = (FilteredDataModel<TaskModel>)responseDto;
            foreach (var trainingModel in response.Data)
            {
                trainingModel.Name = StatusService.Translate(trainingModel.Name);
            }
        }
    }
}