using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class Student : EntityBase
    {
        public string Name { get; set; }

        public int CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public virtual Customer Customer { get; set; }

        public virtual ICollection<Training> Trainings { get; set; }

        public virtual ICollection<Assesment> Assesments { get; set; }

        public int UserProfileId { get; set; }
        [ForeignKey("UserProfileId")]
        public virtual UserProfile UserProfile { get; set; }
    }
}