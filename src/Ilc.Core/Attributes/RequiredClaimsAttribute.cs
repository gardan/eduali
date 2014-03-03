using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ilc.Core.Attributes
{
    public class RequiredClaimsAttribute : Attribute
    {
        public string[] Name { get; set; }
    }
}
