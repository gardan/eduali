using System;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class ProgressEvaluationsService : IProgressEvaluationsService
    {
        public IUow Uow { get; set; }
        
        public ProgressEvaluation Get(int trainingId, int lessonId, int studentId)
        {
            return Uow.ProgressEvaluations.GetAll().Where(p => p.TrainingId == trainingId && p.StudentId == studentId).FirstOrDefault();
        }
    }
}