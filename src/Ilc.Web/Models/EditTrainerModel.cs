﻿namespace Ilc.Web.Models
{
    public class EditTrainerModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

        public UserInfoModel UserInfo { get; set; }
    }
}