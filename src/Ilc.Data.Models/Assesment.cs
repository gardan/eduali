using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class Assesment : StampedEntity
    {
        public string EntryListeningLevel { get; set; }
        public string ExitListeningLevel { get; set; }

        public string EntryReadingLevel { get; set; }
        public string ExittReadingLevel { get; set; }

        public string EntryInteractiveTalkingLevel { get; set; }
        public string ExitInteractiveTalkingLevel { get; set; }

        public string EntryProductiveTalkingLevel { get; set; }
        public string ExitProductiveTalkingLevel { get; set; }

        public string EntryWritingLevel { get; set; }
        public string ExitWritingLevel { get; set; }

        public string EntryRemarks { get; set; }
        public string ExitRemarks { get; set; }

        public virtual ICollection<AssesmentResult> AssesmentResults { get; set; }

        public int TrainingId { get; set; }
        [ForeignKey("TrainingId")]
        public virtual Training Training { get; set; }

        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public Student Student { get; set; }
    }

    public class AssesmentResult : EntityBase
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