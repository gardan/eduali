using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class GradingSystem : EntityBase
    {
        public string Name { get; set; }
        public virtual ICollection<Grade> Grades { get; set; }
    }

    public class Grade : EntityBase
    {
        public string Name { get; set; }
        public int Order { get; set; }

        public int GradingSystemId { get; set; }
        [ForeignKey("GradingSystemId")]
        public virtual GradingSystem GradingSystem { get; set; }
    }
}
