using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Data.Contracts;
using Ilc.Web.Services.DataImport;
using ServiceStack;
using ServiceStack.Validation;
using ServiceStack.Web;

namespace Ilc.Web.Filters.Request.Verification.Import
{
    public class ValidateTrainersImport : RequestFilterAttribute
    {
        public IUow Uow { get; set; }

        public override void Execute(IRequest req, IResponse res, object requestDto)
        {
            Execute(req, res, (ImportTrainersModel)requestDto);    
        }

        public void Execute(IRequest req, IResponse res, ImportTrainersModel requestDto)
        {
            var errors = new List<ValidationErrorField>();
            var i = 0;
            foreach (var trainerBulkImport in requestDto.Data)
            {
                var trainer = Uow.UserProfiles.GetAll().FirstOrDefault(u => u.Email == trainerBulkImport.Email);
                if (trainer != null)
                {
                    errors.Add(new ValidationErrorField("400", i + "-email", "Email already exists"));
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