using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Helpers;
using Ilc.Infrastructure.Contracts;
using ServiceStack;

namespace Ilc.Web.Services.Recovery
{
    public class PasswordRecoveryService : Service
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }
        public IMembershipService Membership { get; set; }
        public IUserNotifyService UserNotifyService { get; set; }

        public HttpResult Post(InitPasswordResetModel request)
        {
            var user = Users.GetByEmail(request.Email);
            string tpl;
            if (user == null)
            {
                tpl = Templates.ForgotPasswordNoUser();
                // Notify that account does not exist.
                UserNotifyService.Notify(request.Email, tpl, "Recover account attempt");
                return new HttpResult(); // EXIT
            }

            // Delete Existing Reset Tokens
            var membership = Uow.Memberships.GetById(user.Id);
            membership.PasswordVerificationToken = "";
            membership.PasswordVerificationTokenExpirationDate = null;

            // Create new reset token
            membership.PasswordVerificationToken = Guid.NewGuid().ToString();
            membership.PasswordVerificationTokenExpirationDate = DateTime.UtcNow.AddDays(1);

            Uow.Memberships.Update(membership);
            Uow.Commit();

            // Send email with reset url
            var body = Templates.ForgotPasswordInitiated(new
                {
                    Email = request.Email,
                    ResetUrl = Request.GetApplicationUrl() + "/#recover?token=" + membership.PasswordVerificationToken
                });
            UserNotifyService.Notify(user.Email, body, "Password recover");
            // UserNotifyService.Notify(tpl, new Dictionary<string, string>() { { "User", request.Email } });

            return new HttpResult();
        }

        public HttpResult Put(ResetPasswordModel request)
        {
            var membership = Uow.Memberships.GetAll().FirstOrDefault(m => m.PasswordVerificationToken == request.Token);
            if (membership == null) // Invalid token
            {
                throw new ArgumentException("Please restart the process.");
            }
            if (membership.PasswordVerificationTokenExpirationDate < DateTime.UtcNow) // Expired token
            {
                throw new ArgumentException("Please restart the process.");
            }

            // Change the pwd
            Users.UpdatePassword(membership.UserId, request.Password);
            var user = Users.GetById(membership.UserId);

            // remove reset token
            membership.PasswordVerificationToken = "";
            membership.PasswordVerificationTokenExpirationDate = null;

            Uow.Memberships.Update(membership);
            Uow.Commit();

            var tpl = Templates.ForgotPasswordComplete();
            UserNotifyService.Notify(user.Email, tpl, "Password changed");

            return new HttpResult();
        }

    }

    public class InitPasswordResetModel
    {
        public string Email { get; set; }
    }

    public class ResetPasswordModel
    {
        public string Token { get; set; }
        public string Password { get; set; }
    }

}