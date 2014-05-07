using System;
using System.Collections.Generic;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Web.Services.DataImport;
using ServiceStack;
using ServiceStack.Validation;
using ServiceStack.Web;

namespace Ilc.Web.Filters.Request.Verification.Import
{
    public class ValidateStudentImport : RequestFilterAttribute
    {
        public IUow Uow { get; set; }
        public IUsersService UsersService { get; set; }

        public override void Execute(IRequest req, IResponse res, object requestDto)
        {
            Execute(req, res, (ImportStudentsModel)requestDto);
        }

        public void Execute(IRequest req, IResponse res, ImportStudentsModel requestDto)
        {
            var errors = new List<ValidationErrorField>();
            var i = 0;
            var user = UsersService.GetByEmail();
            foreach (var studentBulkImport in requestDto.Data)
            {
                // 1. Check for email duplication.
                var trainer = Uow.UserProfiles.GetAll().FirstOrDefault(u => u.Email == studentBulkImport.Email);
                if (trainer != null)
                {
                    errors.Add(new ValidationErrorField("400", i + "-email", "Email already exists"));
                }

                // 2. Check for existing customer
                var customer = Uow.Customers.GetAll().FirstOrDefault(c => c.Name == studentBulkImport.CustomerName && c.CompanyId == user.CompanyId);
                if (customer == null)
                {
                    errors.Add(new ValidationErrorField("400", i + "-customerName", "Customer does not exist"));
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