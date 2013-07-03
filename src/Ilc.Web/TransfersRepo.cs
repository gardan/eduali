using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Web.Models;

namespace Ilc.Web
{
    public static class TransfersRepo
    {
        private static List<TransferModel> _transfers;
        private static int _lastId = 0;

        static TransfersRepo()
        {
            _transfers = new List<TransferModel>();
        }

        public static void Add(TransferModel item)
        {
            item.Id = _lastId + 1;
            _lastId++;

            _transfers.Add(item);
        }
    }
}