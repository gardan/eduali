using System;
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
        public int DurationInDays { get; set; }
    }
}