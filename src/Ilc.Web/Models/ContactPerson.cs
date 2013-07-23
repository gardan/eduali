namespace Ilc.Web.Models
{
    public class ContactPerson
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsMain { get; set; }
    }
}