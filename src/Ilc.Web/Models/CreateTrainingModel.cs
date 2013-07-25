using System;

namespace Ilc.Web.Models
{
    public class CreateTrainingModel
    {
        public string CompanyName { get; set; }
        public string Status { get; set; }
        public string Subject { get; set; }
        public DateTimeOffset DesiredStartDate { get; set; }
        public DateTimeOffset DesiredEndDate { get; set; }
        public StudentModel[] Students { get; set; }


        
    }
}