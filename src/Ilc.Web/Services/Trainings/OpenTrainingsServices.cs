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
        public IUsersService Users { get; set; }
        public ITrainingsService TrainingsService { get; set; }

        public FilteredDataModel<OpenTrainingModel> Get(FilterParametersOpenTrainings request)
        {
            var results = TrainingsService.GetOpenFiltered(request);
            var data = new List<OpenTrainingModel>();

            var currentUser = Users.GetByEmail();
            var currentUserId = currentUser == null ? 0 : currentUser.Id;


            foreach (var training in results.Data)
            {
                var student = training.Students.FirstOrDefault(s => s.UserProfileId == currentUserId);
                data.Add(new OpenTrainingModel()
                    {
                        Name = training.Subject.Name,
                        TrainerName = training.Trainer.UserProfile.UserDetails.FirstName + " " +  training.Trainer.UserProfile.UserDetails.LastName,
                        StartDate = training.DesiredStartDate.DateTime,
                        EndDate = training.DesiredEndDate.DateTime,
                        Id = training.Id,
                        Joined = student != null
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
        public int Id { get; set; }
        public string Name { get; set; } // SubjectName
        public string TrainerName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool Joined { get; set; }
    }
}