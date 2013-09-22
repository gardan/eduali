using System.Collections.Generic;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class Subject : EntityBase
    {
        public string Name { get; set; }

        public virtual ICollection<Trainer> Trainers { get; set; }
    }
}