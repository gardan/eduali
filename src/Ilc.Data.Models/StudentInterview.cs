using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class StudentInterview : StampedEntity
    {
        public string ListeningLevel { get; set; }
        public string TargetListeningLevel { get; set; }

        public string ReadingLevel { get; set; }
        public string TargetReadingLevel { get; set; }

        public string InteractiveTalkingLevel { get; set; }
        public string TargetInteractiveTalkingLevel { get; set; }

        public string ProductiveTalkingLevel { get; set; }
        public string TargetProductiveTalkingLevel { get; set; }

        public string WritingLevel { get; set; }
        public string TargetWritingLevel { get; set; }

        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public Student Student { get; set; }

        public int TrainingId { get; set; }
        [ForeignKey("TrainingId")]
        public Training Training { get; set; }
    }
}