using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Web.Models;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class TrainingsService : Service
    {
        public FilteredDataModel<TrainingModel> Get(FilterParametersBase request)
        {
            return null;
        }
    }
}