using System;
using System.Collections.Generic;
using System.Linq;
using Ilc.Data.Contracts;
using Ilc.Web.Services.DataImport;
using ServiceStack;
using ServiceStack.Validation;
using ServiceStack.Web;

namespace Ilc.Web.Filters.Request.Verification.Import
{
    public class ValidateCustomersImport : RequestFilterAttribute
    {
        public IUow Uow { get; set; }

        public override void Execute(IRequest req, IResponse res, object requestDto)
        {
            Execute(req, res, (ImportCustomersModel)requestDto);
        }

        public void Execute(IRequest req, IResponse res, ImportCustomersModel requestDto)
        {
            var errors = new List<ValidationErrorField>();
            var i = 0;
            foreach (var customerBulkImport in requestDto.Data)
            {
                var trainer = Uow.UserProfiles.GetAll().FirstOrDefault(u => u.Email == customerBulkImport.ContactEmail);
                if (trainer != null)
                {
                    errors.Add(new ValidationErrorField("400", i + "-contactEmail", "Email already exists"));
                }
                i++;
            }

            if (errors.Count == 0) return;

            var responseDto = DtoUtils.CreateErrorResponse(new Object(),
                                                           new ValidationErrorResult(errors));
            res.WriteToResponse(req, responseDto);
        }
    }
}