using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Web.Models;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class TrainersService : Service
    {

        public FilteredDataModel<TrainerModel> Get(FilterParametersTrainers request)
        {
            return new FilteredDataModel<TrainerModel>()
                {
                    Data = new List<TrainerModel>()
                        {
                            new TrainerModel() { Id = 1, Name = "I.C. Bratianu", Phone = "0762526452"},
                            new TrainerModel() { Id = 2, Name = "Nicolae Popete", Phone = "0192749216"}
                        },
                    TotalRecords = 2,
                    TotalDisplayRecords = 2
                };
        }

    }
}