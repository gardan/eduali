﻿namespace Ilc.Web.Models
{
    public class TrainerModel
    {
        public int Id { get; set; }
        public string Name { get { return UserInfo == null ? "" : UserInfo.FirstName + " " + UserInfo.LastName; } }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }

        public string subjectNames { get; set; }

        public UserInfoModel UserInfo { get; set; }

        public SubjectModel[] Subjects { get; set; }
    }


}