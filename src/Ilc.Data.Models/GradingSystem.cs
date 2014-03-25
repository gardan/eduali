using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class GradingSystem : CompanyBaseEntity
    {
        public string Name { get; set; }
        public virtual ICollection<Grade> Grades { get; set; }
        public virtual ICollection<GradingAttribute> Attributes { get; set; } 
    }
}
