using System;
using System.Web.Configuration;
using System.Web.Helpers;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class UserNotifyService : IUserNotifyService
    {
        public IUow Uow { get; set; }


        public void Notify(string email, string body, string subject)
        {
            SendMail(email, subject, body);
        }

        private void SendMail(string to, string subject, string body)
        {
            WebMail.SmtpServer = WebConfigurationManager.AppSettings["SMTPHost"];
            WebMail.SmtpPort = Convert.ToInt32(WebConfigurationManager.AppSettings["SMTPPort"]);
            WebMail.UserName = WebConfigurationManager.AppSettings["SMTPUsername"];
            WebMail.Password = WebConfigurationManager.AppSettings["SMTPPassword"];
            WebMail.EnableSsl = Convert.ToBoolean(WebConfigurationManager.AppSettings["SMTPEnableSsl"]);

            WebMail.From = WebConfigurationManager.AppSettings["SMTPUsername"];

            Uow.Subjects.Add(new Subject()
                {
                    CompanyId = 1,
                    Name = WebConfigurationManager.AppSettings["SMTPHost"]
                });
            Uow.Commit();
            try
            {
                WebMail.Send(to, subject, body);
            }
            catch (Exception)
            {
                throw;
            }
            
        }
    }
}