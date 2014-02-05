using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class Grade : EntityBase
    {
        public string Name { get; set; }
        public int Order { get; set; }

        public int GradingSystemId { get; set; }
        [ForeignKey("GradingSystemId")]
        public virtual GradingSystem GradingSystem { get; set; }
    }
}