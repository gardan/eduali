using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Data.Contracts;
using Ilc.Web.Models;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class DefaultService : Service
    {
        public IUow Uow { get; set; }

        public HttpResult Post(CreateEvaluationModel request)
        {


        }

    }
}