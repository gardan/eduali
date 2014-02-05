using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class StatusDictionary : CompanyBaseEntity
    {
        public string Name { get; set; }
        public string FriendlyName { get; set; }
    }
}
