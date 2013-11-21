using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class Spendings : EntityBase
    {
        public decimal Trainer { get; set; }
        public decimal Supplies { get; set; }
        public decimal Transport { get; set; }

        [Required]
        public virtual Training Training { get; set; }
    }
}