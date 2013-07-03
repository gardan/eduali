using System.Linq;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class TransfersService : Service
    {
        public FilteredDataModel<TransferModel> Get(FilterParametersBase request)
        {
            var ret = new FilteredDataModel<TransferModel> {Data = TransfersRepo.GetAll().ToList()};
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