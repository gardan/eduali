using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Data.Models;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class OffersService : Service
    {
        public IOffersService Offers { get; set; }

        public HttpResult Post(CreateOfferModel request)
        {
            var newOffer = new TrainingOffer().InjectFrom(request) as TrainingOffer;
            
            Offers.Create(newOffer);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.Created,
                    Location = Request.AbsoluteUri.CombineWith(newOffer.Id)
                };
        }

    }
}