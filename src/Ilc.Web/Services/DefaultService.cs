using System;
using Ilc.Data.Contracts;
using Ilc.Web.Models;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class DefaultService : Service
    {
        public IUow Uow { get; set; }

        public HttpResult Post(CreateEvaluationModel request)
        {
            throw new NotImplementedException();
        }

    }
}