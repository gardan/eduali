using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class StudentInterview : StampedEntity
    {
        public string ListeningLevel { get; set; }
        public string TargetListeningLevel { get; set; }

        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public Student Student { get; set; }

        public int TrainingId { get; set; }
        [ForeignKey("TrainingId")]
        public Training Training { get; set; }
    }
}