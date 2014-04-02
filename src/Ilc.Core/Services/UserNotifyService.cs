using System;
using System.Web.Configuration;
using System.Web.Helpers;
using Ilc.Core.Contracts;

namespace Ilc.Core.Services
{
    public class UserNotifyService : IUserNotifyService
    {

        public void Notify(string email, string body)
        {
            SendMail(email, "", body);
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