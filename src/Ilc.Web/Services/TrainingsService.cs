using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Web.Models;
using Omu.ValueInjecter;
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
            ret.Data = results.Data.Select(r => new TrainingModel().InjectFrom(r) as TrainingModel).ToList();

            return ret;
        }
    }
}