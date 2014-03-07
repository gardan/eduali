using Ilc.Infrastructure.Contracts;
using Ilc.Web.Models;
using Ilc.Web.Services.Tasks.Training;
using ServiceStack;
using ServiceStack.Web;

namespace Ilc.Web.Filters.Response
{
    public class TaskModelWithStatusResponseFilter : ResponseFilterAttribute
    {
        public IStatusService StatusService { get; set; }

        public override void Execute(IRequest req, IResponse res, object responseDto)
        {
            var response = (FilteredDataModel<TaskModel>)responseDto;
            foreach (var trainingModel in response.Data)
            {
                trainingModel.Name = StatusService.Translate(trainingModel.Name);
            }
        }
    }
}