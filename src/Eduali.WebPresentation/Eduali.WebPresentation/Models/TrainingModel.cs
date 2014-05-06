using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Eduali.WebPresentation.Models
{
    public class TrainingModel
    {
        public string Name { get; set; }
        public string TrainerName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int DurationInDays { get { return (EndDate - StartDate).Days; } }
    }

    public class ViewTrainingModel
    {
        public TrainingModel[] Data { get; set; }
        public string Query { get; set; }

        public SubjectModel[] Subjects { get; set; }
    }

    public class SubjectModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Selected { get; set; }
    }
}