using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Infrastructure.Workflows.Activities.Training
{
    public class UpdateTrainingStatus : CodeActivity 
    {
        public InArgument<String> NewStatus { get; set; }
        public InArgument<int> TrainingId { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            var uow = context.GetExtension<IUow>();

            var newStatus = NewStatus.Get<string>(context);
            var trainingId = TrainingId.Get<int>(context);

            var training = uow.Trainings.GetById(trainingId);
            // Set status
            // training.Status = newStatus;

            // Set new owners
            foreach (var owner in training.Owners.ToList())
            {
                training.Owners.Remove(owner);
            }
            var newOwnerId = 0;
            UserProfile newOwner = null;
            switch (newStatus)
            {
                case  TrainingStatus.PendingValidation:
                    newOwnerId = uow.TrainingOwnersConfiguration.GetById(trainingId).AdministrationId;
                    newOwner = uow.UserProfiles.GetById(newOwnerId);
                    training.Owners = new List<UserProfile>() { newOwner };

                    break;
                case TrainingStatus.Publishing:
                    newOwnerId = uow.TrainingOwnersConfiguration.GetById(trainingId).AdministrationId;
                    newOwner = uow.UserProfiles.GetById(newOwnerId);
                    training.Owners = new List<UserProfile>() { newOwner };

                    break;
                case TrainingStatus.Planning:
                    newOwnerId = uow.TrainingOwnersConfiguration.GetById(trainingId).AdministrationId;
                    newOwner = uow.UserProfiles.GetById(newOwnerId);
                    training.Owners = new List<UserProfile>() { newOwner };

                    break;
                case TrainingStatus.PlanInterview:
                    newOwnerId = uow.TrainingOwnersConfiguration.GetById(trainingId).AdministrationId;
                    newOwner = uow.UserProfiles.GetById(newOwnerId);
                    training.Owners = new List<UserProfile>() { newOwner };

                    break;
                case TrainingStatus.Interview:
                    newOwnerId = uow.TrainingOwnersConfiguration.GetById(trainingId).CoordinatorId;
                    newOwner = uow.UserProfiles.GetById(newOwnerId);
                    training.Owners = new List<UserProfile>() { newOwner };

                    break;
                case TrainingStatus.Offer:
                    newOwnerId = uow.TrainingOwnersConfiguration.GetById(trainingId).SalesId;
                    newOwner = uow.UserProfiles.GetById(newOwnerId);
                    training.Owners = new List<UserProfile>() { newOwner };

                    break;
                case TrainingStatus.Accepted:
                    newOwnerId = uow.TrainingOwnersConfiguration.GetById(trainingId).AdministrationId;
                    newOwner = uow.UserProfiles.GetById(newOwnerId);
                    training.Owners = new List<UserProfile>() { newOwner };

                    break;
                case TrainingStatus.Planned:
                    newOwnerId = uow.TrainingOwnersConfiguration.GetById(trainingId).TrainerId;
                    newOwner = uow.UserProfiles.GetById(newOwnerId);
                    training.Owners = new List<UserProfile>() { newOwner };

                    break;
                case TrainingStatus.ProgressEvaluation:
                    newOwnerId = uow.TrainingOwnersConfiguration.GetById(trainingId).TrainerId;
                    newOwner = uow.UserProfiles.GetById(newOwnerId);
                    training.Owners = new List<UserProfile>() { newOwner };
                    break;
                case TrainingStatus.Exam:
                    // This step is not used. but i'll just leave it here.
                    break;
                case TrainingStatus.TrainingEvaluation: 
                    // This is a special case because here we need to add all the students as owners
                    var students = uow.Trainings.GetById(trainingId).Students;

                    var studentUsers = students.Select(student => student.UserProfile).ToList();

                    training.Owners = studentUsers;
                    break;
                case TrainingStatus.Ended:
                    newOwnerId = uow.TrainingOwnersConfiguration.GetById(trainingId).TrainerId;
                    newOwner = uow.UserProfiles.GetById(newOwnerId);
                    training.Owners = new List<UserProfile>() { newOwner };

                    break;
                case TrainingStatus.Complete:
                    // There is not info of who should be the owner here. But i suspect an administrator.
                    break;
            }

            uow.Trainings.Update(training);
            uow.Commit();
        }
    }
}
