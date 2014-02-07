using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class Subject : EntityBase
    {
        public string Name { get; set; }
        public int CompanyId { get; set; }
        [ForeignKey("CompanyId")]
        public Company Company { get; set; }

        public virtual ICollection<Trainer> Trainers { get; set; }
    }
}