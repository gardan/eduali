using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Web.Authentication.Contracts;
using Ilc.Web.Filters.Request;
using Ilc.Web.Filters.Request.Verification.Profile;
using ServiceStack;

namespace Ilc.Web.Services
{
    [IlcAuth]
    public class ProfileService : Service
    {
        public IUsersService Users { get; set; }
        
        public HttpResult Put(GeneralModel request)
        {
            var user = Users.GetByEmail();

            user.UserDetails.FirstName = request.FirstName;
            user.UserDetails.LastName = request.LastName;

            Users.Update(user);

            return new HttpResult();
        }

        [EmailModelDuplication()]
        public HttpResult Put(EmailModel request)
        {
            var user = Users.GetByEmail();
            
            user.Email = request.Email;
            
            Users.Update(user);

            return new HttpResult();
        }

        [PasswordModelVerification]
        public HttpResult Put(PasswordModel request)
        {
            var user = Users.GetByEmail();
            Users.UpdatePassword(user.Id, request.NewPassword);
            
            return new HttpResult();
        }
    }

    public class GeneralModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class PasswordModel
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }

    public class EmailModel
    {
        public string Email { get; set; }
    }
}