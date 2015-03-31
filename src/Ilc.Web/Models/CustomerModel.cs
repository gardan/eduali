using System.Collections.Generic;
using System.Linq;

namespace Ilc.Web.Models
{
    public class CustomerModel
    {
        public int Id { get; set; }

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

        public List<ContactPersonModel> ContactPersons { get; set; }
        public ContactPersonModel ContactPerson
        {
            get { return ContactPersons == null || ContactPersons.Count == 0 ? null : ContactPersons.FirstOrDefault(cp => cp.IsMain); }
        }
    }
}