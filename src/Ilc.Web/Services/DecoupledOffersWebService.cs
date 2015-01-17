using System.Collections.Generic;
using System.Linq;
using Ilc.Core;
using Ilc.Core.Services;
using Ilc.Data.Contracts;
using Ilc.Web.Models;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class DecoupledOffersWebService : Service
    {

        public IDecoupledOffersService Offers { get; set; }


        public FilteredDataModel<DecoupledOfferModel> Get(FilterParametersDecoupledOffers request)
        {
            var results = Offers.GetFiltered(request);
            return new FilteredDataModel<DecoupledOfferModel>()
            {
                Data = new List<DecoupledOfferModel>(results.Data.Select(o => new DecoupledOfferModel()
                {
                    Id = o.Id
                })),
                TotalDisplayRecords = results.TotalDisplayRecords,
                TotalRecords = results.TotalRecords
            };
        }
    }

    public class FilterParametersDecoupledOffers : FilterArgumentsDecoupledOffer
    {
    }

    public class DecoupledOfferModel
    {
        public int Id { get; set; }
    }
}