namespace Ilc.Web.Models
{
    public class StudentModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }

        public CustomerModel Customer { get; set; }
    }
}