using System;
using System.Collections.Generic;
using System.Web.Configuration;
using System.Web.Helpers;
using Ilc.Core.Contracts;
using Ilc.Infrastructure.Contracts;

namespace Ilc.Infrastructure.Services
{
    public class UserNotifyService : IUserNotifyService
    {
        public IUsersService Users { get; set; }

        public void Notify(int userId, string body)
        {
            var email = Users.GetById(userId);
            SendMail(email.Email, "", body);
        }

        private void SendMail(string to, string subject, string body)
        {
            WebMail.SmtpServer = WebConfigurationManager.AppSettings["SMTPHost"];
            WebMail.SmtpPort = Convert.ToInt32(WebConfigurationManager.AppSettings["SMTPPort"]);
            WebMail.UserName = WebConfigurationManager.AppSettings["SMTPUsername"];
            WebMail.Password = WebConfigurationManager.AppSettings["SMTPPassword"];
            WebMail.EnableSsl = Convert.ToBoolean(WebConfigurationManager.AppSettings["SMTPEnableSsl"]);

            WebMail.From = "admin@eduali.com";
            
            WebMail.Send(to, subject, body);
        }
    }
}