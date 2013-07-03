using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Web.Models;

namespace Ilc.Web
{
    public static class TransfersRepo
    {
        private static readonly List<TransferModel> _transfers;
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

        public static TransferModel Get(int id)
        {
            return _transfers.Find(t => t.Id == id);
        }

        public static TransferModel[] GetAll()
        {
            return _transfers.ToArray();
        }
    }
}