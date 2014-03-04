using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Contracts;

namespace Ilc.Infrastructure.Workflows.Activities.Training
{
    public class AddStudentToTraining : CodeActivity
    {
        public InArgument<int> TrainingId { get; set; }
        public InArgument<int> StudentId { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            var uow = context.GetExtension<IUow>();
            var trainingId = TrainingId.Get<int>(context);
            var studentId = StudentId.Get<int>(context);

            var training = uow.Trainings.GetById(trainingId);
            var student = uow.Students.GetById(studentId);
            training.Students.Add(student);
            uow.Trainings.Update(training);
            uow.Commit();
        }
    }
}
