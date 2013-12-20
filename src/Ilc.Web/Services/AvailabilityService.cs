using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class AvailabilityService : Service
    {
        public IAvailabilityService Availability { get; set; }

        public FilteredDataModel<AvailabilityModel> Get(FilterParametersAvailability request)
        {
            var data = Availability.GetFiltered(request);
            return new FilteredDataModel<AvailabilityModel>()
                {
                    Data = data.Data.Select(a => new AvailabilityModel().InjectFrom<AvailabilityToAvailabilityModel>(a) as AvailabilityModel).ToList()
                };
        }
    }

    public class AvailabilityModel
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int ResourceId { get; set; }
    }

    public class FilterParametersAvailability : FilterArgumentsAvailability
    {
    }
}