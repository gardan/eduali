﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class Customer : EntityBase  
    {
        public string Name { get; set; }
        public string BillingAddress { get; set; }
        public string BankAccount { get; set; }

        public virtual ICollection<ContactPerson> ContactPersons { get; set; } 
    }
}