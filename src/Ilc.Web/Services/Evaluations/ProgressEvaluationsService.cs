using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services.Evaluations
{
    public class ProgressEvaluationsService : Service
    {

        public IProgressEvaluationsService ProgressEvaluations { get; set; }

        public FilteredDataModel<ProgressEvaluationModel> Get(FilterParametersProgressEvaluations request)
        {
            var evaluationsResult = ProgressEvaluations.GetFiltered(request);

            return new FilteredDataModel<ProgressEvaluationModel>()
                {
                    Data = evaluationsResult.Data.Select(p => new ProgressEvaluationModel().InjectFrom(p) as ProgressEvaluationModel).ToList(),
                    TotalDisplayRecords = evaluationsResult.TotalDisplayRecords,
                    TotalRecords = evaluationsResult.TotalRecords
                };
        }

        public HttpResult Put(ProgressEvaluationModel request)
        {
            var evaluation = ProgressEvaluations.GetById(request.Id);
            evaluation.Progress = request.Progress;

            ProgressEvaluations.Update(evaluation);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

    }

    public class ProgressEvaluationModel
    {
        public int Id { get; set; }
        public string Progress { get; set; }
    }

    public class FilterParametersProgressEvaluations : FilterArgumentsProgressEvaluations
    {
        
    }
}