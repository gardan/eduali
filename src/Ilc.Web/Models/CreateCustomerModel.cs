using System.ComponentModel.DataAnnotations;

namespace Ilc.Web.Models
{
    public class CreateCustomerModel
    {
        public string CustomerId { get; set; }
        public string Name { get; set; }
        public string Department { get; set; }
        public string BillingAddress { get; set; }
        public string Postcode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }

        public string BankName { get; set; }
        public string BankAccount { get; set; }
        public string FiscalCode { get; set; }
        public string CommerceNumber { get; set; }
    }
}