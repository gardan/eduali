﻿using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Infrastructure.Workflows.Activities.Training
{
    public class PersistTrainingEvaluation : CodeActivity
    {
        public InArgument<TrainingEvaluation> TrainingEvaluation { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            // Create the evaluation
            var uow = context.GetExtension<IUow>();
            var evaluation = TrainingEvaluation.Get<TrainingEvaluation>(context);
            uow.TrainingEvaluations.Add(evaluation);
            uow.Commit();

            // Remove the current owner (student) from this training
            var trainingId = evaluation.TrainingId;
            var userId = evaluation.StudentId;
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
