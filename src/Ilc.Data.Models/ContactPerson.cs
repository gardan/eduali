using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class ContactPerson : EntityBase    
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsMain { get; set; }

        public int UserProfileId { get; set; }
        [ForeignKey("UserProfileId")]
        public virtual UserProfile UserProfile { get; set; }

        public int CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public virtual Customer Customer { get; set; }

        public virtual ICollection<Training> Trainings { get; set; }
    }
}
