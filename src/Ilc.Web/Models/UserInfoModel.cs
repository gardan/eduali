using System;

namespace Ilc.Web.Models
{
    public class UserInfoModel
    {
        public int Id { get; set; }
        public string AvatarLocation { get { return string.Format("api/users/{0}/avatar", Id); } }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }

        public string Name {
            get { return FirstName + " " + LastName; }
        }
    }
}