namespace Ilc.Web.Models
{
    public class CreateTrainerModel
    {
        public UserInfoModel UserInfo { get; set; }
        public SubjectModel[] Subjects { get; set; }
    }
}