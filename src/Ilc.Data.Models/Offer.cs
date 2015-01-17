using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class Offer : StampedEntity
    {
        public decimal Amount { get; set; }
        public DateTimeOffset SentAt { get; set; }
        public bool Accepted { get; set; }
        public DateTimeOffset PaymentDueAt { get; set; }
        public string Tos { get; set; }
        public bool Payed { get; set; }

        // Relations
        public virtual ICollection<Training> Trainings { get; set; }

        public virtual Customer Customer { get; set; }
    }
}
