using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class ContactPerson : EntityBase    
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsMain { get; set; }
    }
}
