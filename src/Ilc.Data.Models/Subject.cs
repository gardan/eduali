using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class Subject : CompanyBaseEntity
    {
        public string Name { get; set; }

        public virtual ICollection<Trainer> Trainers { get; set; }
    }
}