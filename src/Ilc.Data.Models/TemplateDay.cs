using System;
using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class TemplateDay : EntityBase
    {
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }

        public bool OffDay { get; set; }
        
        public int TemplateId { get; set; }
        [ForeignKey("TemplateId")]
        public virtual Template Template { get; set; }
    }
}