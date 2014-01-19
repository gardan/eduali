using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Models;
using Ilc.Infrastructure.Contracts;
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
        public IAvailabilityTemplatesService AvailabilityTemplates { get; set; }

        public FilteredDataModel<AvailabilityModel> Get(FilterParametersAvailability request)
        {
            var data = Availability.GetFiltered(request);
            return new FilteredDataModel<AvailabilityModel>()
                {
                    Data = data.Data.Select(a => new AvailabilityModel().InjectFrom<AvailabilityToAvailabilityModel>(a) as AvailabilityModel).ToList()
                };
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <exception cref="BadRequestModel">
        ///     ErrorId: 401 - AvailabilityDays conflict when sending a template
        /// </exception>
        public HttpResult Post(CreateAvailabilityModel request)
        {
            //return new HttpResult(new BadRequestModel() {ErrorId = 401})
            //    {
            //        StatusCode = HttpStatusCode.BadRequest,
            //        StatusDescription = "Conflict with other availability days."
            //    };

            if (request.TemplateId <= 0)
            {
                var availability = new Availability().InjectFrom<AvailabilityModelToAvailability>(request) as Availability;
                Availability.Create(availability);
            }
            else
            {
                var availabilities = AvailabilityTemplates.GetAvailabilities(request.TemplateId, request.StartDate, request.EndDate);

                foreach (var availability in availabilities)
                {
                    availability.TrainerId = request.ResourceId;
                }

                Availability.Create(availabilities, request.Override);
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
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int ResourceId { get; set; }

        public int TemplateId { get; set; }


        /// <summary>
        /// If there is a conflict with the availabilities, this indicates wether to override or not.
        /// </summary>
        public bool Override { get; set; }
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