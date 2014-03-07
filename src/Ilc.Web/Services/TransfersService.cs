using System.Linq;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class TransfersService : Service
    {
        public FilteredDataModel<TransferModel> Get(FilterParametersBase request)
        {
            var data = TransfersRepo.GetAll().ToList();
            var ret = new FilteredDataModel<TransferModel>
                          {
                              TotalDisplayRecords = data.Count,
                              TotalRecords = data.Count,
                              Data = data
                          };
            return ret;
        }

        public HttpResult Post(CreateTransferModel request)
        {
            var transfer = new TransferModel().InjectFrom(request) as TransferModel;
            TransfersRepo.Add(transfer);

            return new HttpResult(transfer);
        }
    }
}