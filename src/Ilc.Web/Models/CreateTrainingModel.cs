using System;

namespace Ilc.Web.Models
{
    public class CreateTrainingModel
    {
        public string Location { get; set; }
        public DateTimeOffset DesiredStartDate { get; set; }
        public DateTimeOffset DesiredEndDate { get; set; }
        public StudentModel[] Students { get; set; }

        public int SubjectId { get; set; }
        public int GradingSystemId { get; set; }
        public int CustomerId { get; set; }

        public int TrainerId { get; set; }

        public bool Public { get; set; }
        public DateTime DateOfValidation { get; set; }
        public decimal Price { get; set; }
        public int RequiredStudents { get; set; }

        public OwnersModel WorkflowOwners { get; set; }

        public ContactPersonModel[] Contacts { get; set; }

        public string Color { get; set; }
    }

    public class OwnersModel
    {
        public int Sales { get; set; }
        public int Administration { get; set; }
        public int Coordinator { get; set; }
        public int Trainer { get; set; }
    }
}