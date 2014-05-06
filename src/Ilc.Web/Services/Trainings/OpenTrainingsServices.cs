using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Models;
using Ilc.Web.Models;
using ServiceStack;

namespace Ilc.Web.Services.Trainings
{
    public class OpenTrainingsServices : Service
    {

        public ITrainingsService TrainingsService { get; set; }

        public FilteredDataModel<OpenTrainingModel> Get(FilterParametersOpenTrainings request)
        {
            var results = TrainingsService.GetOpenFiltered(request);
            var data = new List<OpenTrainingModel>();

            foreach (var training in results.Data)
            {
                data.Add(new OpenTrainingModel()
                    {
                        Name = training.Subject.Name,
                        TrainerName = training.Trainer.UserProfile.UserDetails.FirstName + " " +  training.Trainer.UserProfile.UserDetails.LastName,
                        StartDate = training.DesiredStartDate.DateTime,
                        EndDate = training.DesiredEndDate.DateTime
                    });
            }

            return new FilteredDataModel<OpenTrainingModel>()
                {
                    Data = data
                };
        }

    }

    public class FilterParametersOpenTrainings : FilterArgumentsOpenTrainings
    {
        
    }

    public class OpenTrainingModel
    {
        public string Name { get; set; } // SubjectName
        public string TrainerName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}