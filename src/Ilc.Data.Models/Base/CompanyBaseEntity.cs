using System.ComponentModel.DataAnnotations.Schema;

namespace Ilc.Data.Models.Base
{
    public abstract class CompanyBaseEntity : EntityBase
    {
        public int CompanyId { get; set; }
        [ForeignKey("CompanyId")]
        public Company Company { get; set; }
    }
}