using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ilc.Web.Models
{
    public class EditStudentModel
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string Name { get; set; }

        public UserInfoModel UserInfo { get; set; }
    }
}