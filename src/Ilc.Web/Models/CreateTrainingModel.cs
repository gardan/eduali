using System;

namespace Ilc.Web.Models
{
    public class CreateTrainingModel
    {
        public DateTimeOffset DesiredStartDate { get; set; }
        public DateTimeOffset DesiredEndDate { get; set; }
        public StudentModel[] Students { get; set; }

        public int SubjectId { get; set; }
        public int TrainingSystemId { get; set; }
        public int CustomerId { get; set; }
        
    }
}