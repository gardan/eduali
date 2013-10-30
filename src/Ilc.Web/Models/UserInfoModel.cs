namespace Ilc.Web.Models
{
    public class UserInfoModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        public string Name {
            get { return FirstName + " " + LastName; }
        }
    }
}