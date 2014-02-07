using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class Trainer : CompanyBaseEntity
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

        public virtual ICollection<Subject> Subjects { get; set; }

        public int UserProfileId { get; set; }
        [ForeignKey("UserProfileId")]
        public virtual UserProfile UserProfile { get; set; }   
    }
}
