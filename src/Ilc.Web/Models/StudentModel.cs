namespace Ilc.Web.Models
{
    public class StudentModel
    {
        public int Id { get; set; }
        public string Name {
            get { return UserInfo == null ? "" : UserInfo.Name; }
        }
        public string Address { get; set; }
        public string Phone { get; set; }

        public CustomerStudentModel Customer { get; set; }
        public UserInfoModel UserInfo { get; set; }
    }
}