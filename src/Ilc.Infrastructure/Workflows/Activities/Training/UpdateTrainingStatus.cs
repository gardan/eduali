using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Contracts;

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
            training.Status = newStatus;
            uow.Trainings.Update(training);
            uow.Commit();
        }
    }
}
