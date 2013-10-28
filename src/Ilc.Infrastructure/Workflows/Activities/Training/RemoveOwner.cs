using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Contracts;

namespace Ilc.Infrastructure.Workflows.Activities.Training
{
    public class RemoveOwner : CodeActivity 
    {
        public InArgument<int> TrainingId { get; set; }
        public InArgument<int> OwnerUserId { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            var uow = context.GetExtension<IUow>();

            var trainingId = TrainingId.Get<int>(context);
            var userId = OwnerUserId.Get<int>(context);

            var training = uow.Trainings.GetById(trainingId);
            foreach (var userProfile in training.Owners.Where(userProfile => userProfile.Id == userId))
            {
                training.Owners.Remove(userProfile);
                break;
            }

            uow.Trainings.Update(training);
            uow.Commit();
        }
    }
}
