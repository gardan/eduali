namespace Ilc.Web.Models
{
    public class CreateCustomerModel
    {
        public string Name { get; set; }
        public string BillingAddress { get; set; }
        public string BankAccount { get; set; }
        public string ContactName { get; set; }
        public string ContactEmail { get; set; }
    }
}