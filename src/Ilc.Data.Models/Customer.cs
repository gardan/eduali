using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;


namespace Ilc.Data.Models
{
    public class Customer : CompanyBaseEntity  
    {
        public string CustomerId { get; set; }
        public string Name { get; set; }
        public string BillingAddress { get; set; }
        public string Postcode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }

        public string BankName { get; set; }
        public string BankAccount { get; set; }
        public string FiscalCode { get; set; }
        public string CommerceNumber { get; set; }

        public virtual ICollection<ContactPerson> ContactPersons { get; set; }
        public virtual ICollection<Training> Trainings { get; set; }
        public virtual ICollection<CustomerLog> Logs { get; set; } 
    }
}
