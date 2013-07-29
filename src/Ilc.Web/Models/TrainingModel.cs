﻿namespace Ilc.Web.Models
{
    public class TrainingModel : CreateTrainingModel
    {
        public int Id { get; set; }

        public UserModel[] Owners { get; set; }
        public TrainerModel Trainer { get; set; }
        public CustomerModel Customer { get; set; }
        public SubjectModel Subject { get; set; }

        public string TrainerName { get; set; }
        public string CustomerName { get; set; }
        public string Status { get; set; }
        public string SubjectName { get; set; }
    }
}