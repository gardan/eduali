using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
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

        public HttpResult Put(PasswordModel request)
        {
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
        public string Email { get; set; }
    }

    public class EmailModel
    {
        public string Email { get; set; }
    }
}