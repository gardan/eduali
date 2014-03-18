using System;
using System.Collections.Generic;
using Ilc.Core.Contracts;
using Ilc.Web.Authentication.Contracts;
using Ilc.Web.Services;
using ServiceStack;
using ServiceStack.Validation;
using ServiceStack.Web;

namespace Ilc.Web.Filters.Request.Verification.Profile
{


    public class PasswordModelVerification : RequestFilterAttribute
    {
        public IIdentityStoreManager IdentityStoreManager { get; set; }
        public IUsersService Users { get; set; }

        public override void Execute(IRequest req, IResponse res, object requestDto)
        {
            var pwdModel = (PasswordModel) requestDto;
            var user = Users.GetByEmail();

            var isValid = IdentityStoreManager.ValidateLocalLogin(user.Email, pwdModel.CurrentPassword);
            if (isValid) return;
            
            
            var responseDto = DtoUtils.CreateErrorResponse(new Object(),
                                                           new ValidationErrorResult(new List<ValidationErrorField>()
                                                               {
                                                                   new ValidationErrorField("400", "currentPassword", "Invalid password.")
                                                               }
                                                                ));
            res.WriteToResponse(req, responseDto);
        }
    }
}