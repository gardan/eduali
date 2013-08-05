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
    public class TrainersService : Service
    {

        public ITrainersService Trainers { get; set; }

        public FilteredDataModel<TrainerModel> Get(FilterParametersTrainers request)
        {
            var results = Trainers.GetFiltered(request);

            return new FilteredDataModel<TrainerModel>()
                {
                    Data = results.Data.Select(t => new TrainerModel().InjectFrom(t) as TrainerModel).ToList(),
                    TotalRecords = 2,
                    TotalDisplayRecords = 2
                };
        }

        public HttpResult Post(CreateTrainerModel request)
        {
            var newTrainer = new Trainer().InjectFrom(request) as Trainer;
 
            Trainers.Create(newTrainer);

            var transferObject = new TrainerModel().InjectFrom(newTrainer);
            return new HttpResult(transferObject)
                {
                    StatusCode = HttpStatusCode.Created,
                    Location = Request.AbsoluteUri.CombineWith(newTrainer.Id)
                };
        }

    }
}