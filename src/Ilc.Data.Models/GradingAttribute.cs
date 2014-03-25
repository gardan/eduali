using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class GradingAttribute : EntityBase
    {
        public string Name { get; set; }

        public bool Enabled { get; set; }

        public int GradingSystemId { get; set; }
        [ForeignKey("GradingSystemId")]
        public virtual GradingSystem GradingSystem { get; set; }

        public virtual ICollection<Training> Trainings { get; set; } 
    }
}