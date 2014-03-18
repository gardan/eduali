using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Web.Services;
using ServiceStack;
using ServiceStack.Validation;
using ServiceStack.Web;

namespace Ilc.Web.Filters.Request.Verification.Profile
{
    public class EmailModelDuplication : RequestFilterAttribute
    {
        public IUsersService Users { get; set; }

        public override void Execute(IRequest req, IResponse res, object requestDto)
        {
            var emailModel = (EmailModel) requestDto;
            var user = Users.GetByEmail(emailModel.Email);
            if (user == null) return;

            var responseDto = DtoUtils.CreateErrorResponse(new Object(),
                                                           new ValidationErrorResult(new List<ValidationErrorField>()
                                                                    { new ValidationErrorField("400", "email",  "Email already exists.") }
                                                                ));
            res.WriteToResponse(req, responseDto);
        }
    }

    public class ErrorModel
    {
        public string[] Messages { get; set; }
    }
}