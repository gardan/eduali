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

        public int TrainingId { get; set; }
        [ForeignKey("TrainingId")]
        public virtual Training Training { get; set; }

        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public Student Student { get; set; }
    }
}