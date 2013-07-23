namespace Ilc.Web.Models
{
    public class CustomerModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string BillingAddress { get; set; }
        public string BankAccount { get; set; }
        public ContactPersonModel[] ContactPersonsModel { get; set; }
    }
}