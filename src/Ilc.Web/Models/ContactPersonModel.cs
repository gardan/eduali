using Ilc.Web.Services;

namespace Ilc.Web.Models
{
    public class ContactPersonModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsMain { get; set; }
        public UserModel User { get; set; }
    }
}