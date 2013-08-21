using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Infrastructure.Workflows.Activities.Training
{
    public class PersistSchedule : CodeActivity
    {
        public InArgument<TrainingScheduleDay> ScheduleDay { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            var uow = context.GetExtension<IUow>();
            var scheduleDay = ScheduleDay.Get<TrainingScheduleDay>(context);
            uow.TrainingScheduleDays.Add(scheduleDay);
            uow.Commit();
        }
    }
}
