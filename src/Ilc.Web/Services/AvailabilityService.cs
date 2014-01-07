using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Models;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.Common.Web;
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


        public HttpResult Post(CreateAvailabilityModel request)
        {
            var availabilities = new List<AvailabilityModel>(request.Data);



            foreach (var availabilityModel in availabilities)
            {
                var availability = new Availability().InjectFrom<AvailabilityModelToAvailability>(availabilityModel) as Availability; 
                Availability.Create(availability);
            }

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Delete(AvailabilityModel request)
        {
            Availability.Delete(request.Id);
            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

    }

    public class CreateAvailabilityModel
    {
        public AvailabilityModel[] Data { get; set; }
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