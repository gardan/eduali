using System;
using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class TrainingScheduleDay : EntityBase
    {
        public string LessonName { get; set; }
        public int Order { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }

        public int TrainingId { get; set; }
        [ForeignKey("TrainingId")]
        public Training Training { get; set; }

        public int OwnerId { get; set; }
        [ForeignKey("OwnerId")]
        public UserProfile Owner { get; set; }
    }
}