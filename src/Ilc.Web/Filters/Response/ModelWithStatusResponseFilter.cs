using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Infrastructure.Contracts;
using Ilc.Web.Models;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Filters.Response
{
    public class ModelWithStatusResponseFilter : ResponseFilterAttribute
    {
        public IStatusService StatusService { get; set; }

        public override void Execute(IHttpRequest req, IHttpResponse res, object responseDto)
        {
            var response = (FilteredDataModel<TrainingModel>)responseDto;
            foreach (var trainingModel in response.Data)
            {
                trainingModel.StatusFriendlyName = StatusService.Translate(trainingModel.Status);
            }
        }
    }
}