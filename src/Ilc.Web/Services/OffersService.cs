using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core;
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

        public FilteredDataModel<OfferModel> Get(FilterParametersOffer request)
        {
            var results = Offers.GetFiltered(request);
            return new FilteredDataModel<OfferModel>()
                {
                    Data = new List<OfferModel>(results.Data.Select(o => new OfferModel()
                        {
                            Id = o.Id,
                            LessonDuration = o.LessonDuration,
                            LessonsNo = o.NoLessons,
                            PossibleCost = o.Price,
                            Price = o.Price,
                            Selected = o.Selected
                        })),
                    TotalDisplayRecords = results.TotalDisplayRecords,
                    TotalRecords = results.TotalRecords
                };
        }

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

    public class FilterParametersOffer : FilterArgumentsOffers
    {
    }

    public class OfferModel
    {
        public int Id { get; set; }
        public decimal Price { get; set; }
        public decimal PossibleCost { get; set; }
        public int LessonDuration { get; set; }
        public int LessonsNo { get; set; }
        public bool Selected { get; set; }
    }
}