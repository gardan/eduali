using System.Collections.Generic;
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

        public ICollection<InterviewResult> InterviewResults { get; set; }

        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public Student Student { get; set; }

        public int TrainingId { get; set; }
        [ForeignKey("TrainingId")]
        public Training Training { get; set; }
    }

    public class InterviewResult : EntityBase
    {
        public int GradingAttributeId { get; set; }
        [ForeignKey("GradingAttributeId")]
        public virtual GradingAttribute GradingAttribute { get; set; }

        public int CurrentGradeId { get; set; }
        [ForeignKey("CurrentGradeId")]
        public virtual Grade CurrentGrade { get; set; }

        public int TargetGradeId { get; set; }
        [ForeignKey("TargetGradeId")]
        public virtual Grade TargetGrade { get; set; }
    }
}