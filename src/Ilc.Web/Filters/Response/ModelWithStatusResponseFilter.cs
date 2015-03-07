using Ilc.Core;
using Ilc.Infrastructure.Contracts;
using Ilc.Web.Models;
using ServiceStack;
using ServiceStack.Web;

namespace Ilc.Web.Filters.Response
{
    public class ModelWithStatusResponseFilter : ResponseFilterAttribute
    {
        public IStatusService StatusService { get; set; }

        public override void Execute(IRequest req, IResponse res, object responseDto)
        {
            var response = (FilteredDataModel<TrainingModel>)responseDto;
            foreach (var trainingModel in response.Data)
            {
                //trainingModel.StatusFriendlyName = StatusService.Translate(trainingModel.Status);
                //trainingModel.StatusWeight = (decimal) TrainingStatus.GetWeight(trainingModel.Status);
            }
        }
    }
}