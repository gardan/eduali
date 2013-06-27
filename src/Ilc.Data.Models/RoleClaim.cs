using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;
using Ilc.Data.Models.SimpleMembership;

namespace Ilc.Data.Models
{
    public class RoleClaim : EntityBase
    {
        public string Name { get; set; }
        public string Value { get; set; }

        public int RoleId { get; set; }
        [ForeignKey("RoleId")]
        public virtual Role Role { get; set; }
    }
}
