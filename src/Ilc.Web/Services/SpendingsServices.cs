﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Data.Contracts;
using Omu.ValueInjecter;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class SpendingsServices : Service
    {
        public IUow Uow { get; set; }

        public HttpResult Put(SpendingModel request)
        {
            var spendings = Uow.Spendings.GetById(request.Id);
            var x = spendings.Training;
            spendings.InjectFrom(request);

            Uow.Spendings.Update(spendings);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class SpendingModel
    {
        public int Id { get; set; }
        public decimal Trainer { get; set; }
        public decimal Supplies { get; set; }
        public decimal Transport { get; set; }
    }
}