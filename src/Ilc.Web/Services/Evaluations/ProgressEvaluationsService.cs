using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services.Evaluations
{
    public class ProgressEvaluationsService : Service
    {

        public IProgressEvaluationsService ProgressEvaluations { get; set; }

        public HttpResult Get(ProgressEvaluationRequestModel request)
        {
            var evaluation = ProgressEvaluations.Get(request.TrainingId, request.LessonId, request.StudentId);
            var retEval = new ProgressEvaluationModel().InjectFrom(evaluation);

            return new HttpResult(retEval)
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

    }

    public class ProgressEvaluationModel
    {

    }

    public class ProgressEvaluationRequestModel
    {
        public int TrainingId { get; set; }
        public int LessonId { get; set; }
        public int StudentId { get; set; }
    }
}