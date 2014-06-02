using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class FileTemplate : StampedCompanyBaseEntity
    {
        public string Content { get; set; }
        public string Name { get; set; }

        public FileTemplateType Type { get; set; }
    }

    public enum FileTemplateType
    {
        Student = 1,
        Offer = 2,
        Training = 3
    }
}
