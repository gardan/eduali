using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Data.Models;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class TrainingsService : Service
    {
        public ITrainingsService Trainings { get; set; }

        public FilteredDataModel<TrainingModel> Get(FilterParametersTrainings request)
        {
            var ret = new FilteredDataModel<TrainingModel>();

            var results = Trainings.GetFilteredTrainings(request);
            ret.TotalDisplayRecords = results.TotalDisplayRecords;
            ret.TotalRecords = results.TotalRecords;
            ret.Data = results.Data.Select(r => new TrainingModel().InjectFrom <TrainingToWebModel>(r) as TrainingModel).ToList();

            return ret;
        }

        public HttpResult Post(CreateTrainingModel request)
        {
            var newTraining = new Training
                {
                    SubjectId = request.SubjectId,
                    DesiredStartDate = request.DesiredStartDate,
                    DesiredEndDate = request.DesiredEndDate,
                    Status = "Rfi"
                    // Owners = new UserProfile[] { AuthManager.GetCurrentUser() }
                };


            Trainings.Create(newTraining);

            return new HttpResult(newTraining)
                {
                    StatusCode = HttpStatusCode.Created,
                    Location = Request.AbsoluteUri.CombineWith(newTraining.Id)
                };
        }
    }
}