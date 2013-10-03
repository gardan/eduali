using System.Activities;
using System.Collections.Generic;
using System.Linq;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Infrastructure.Workflows.Activities.Training
{
    public class DeleteTrainingSchedule : CodeActivity
    {
        public InArgument<int> TrainingId { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            var uow = context.GetExtension<IUow>();
            var id = TrainingId.Get<int>(context);
            
            // var training = uow.Trainings.GetById(id);
            // 
            // training.ScheduleDays = new List<TrainingScheduleDay>();
            // uow.Trainings.Update(training);
            // uow.Commit();



            // If the first way is not working.
            var trainingDays = uow.TrainingScheduleDays.GetAll().Where(d => d.TrainingId == id);
            
            foreach (var trainingScheduleDay in trainingDays)
            {
                uow.TrainingScheduleDays.Delete(trainingScheduleDay);
            
            }
            uow.Commit();
        }
    }
}