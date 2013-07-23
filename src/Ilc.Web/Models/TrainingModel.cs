using System;

namespace Ilc.Web.Models
{
    public class TrainingModel
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Status { get; set; }
        public string Subject { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public StudentModel[] Students { get; set; }


        public UserModel[] Owners { get; set; }
    }
}