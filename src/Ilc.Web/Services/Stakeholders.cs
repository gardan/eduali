using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class Stakeholders : Service
    {
        public IUow Uow { get; set; }

        public HttpResult Post(CreateStakeholders request)
        {
            var training = Uow.Trainings.GetById(request.TrainingId);
            var stakeholdersToAdd = new List<UserProfile>();
            var justLoad = training.StakeHolders;

            foreach (var stakeholderId in request.Stakeholders)
            {
                var IsStakeholderExistInTraining = training.StakeHolders.FirstOrDefault(u => u.Id == stakeholderId) != null;

                if (!request.IsRemove && !IsStakeholderExistInTraining)
                {
                    training.StakeHolders.Add(Uow.UserProfiles.GetById(stakeholderId));
                }

                if (request.IsRemove && IsStakeholderExistInTraining)
                {
                    training.StakeHolders.Remove(Uow.UserProfiles.GetById(stakeholderId));
                }
            }

            Uow.Trainings.Update(training);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.Created
                };
        }
    }

    [Route("/stakeholders", "POST")]
    public class CreateStakeholders
    {
        public int[] Stakeholders { get; set; }
        public int TrainingId { get; set; }

        public bool IsRemove { get; set; }
    }
}