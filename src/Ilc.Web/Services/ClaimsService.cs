using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Web.Models;
using ServiceStack.Common.Web;
using Ilc.Data.Contracts;
using Ilc.Web.Models;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class ClaimsService : Service
    {
        public IUow Uow { get; set; }
        public IClaimsService Claims { get; set; }

        public FilteredDataModel<ClaimModel> Get(FilterParametersClaims request)
        {
            List<ClaimModel> dataList;
            if (request.RoleId == 0)
            {
                var systemClaims = Claims.GetAll();
                dataList = systemClaims.Select(c => new ClaimModel()
                    {
                        Name = c
                    }).ToList();

                return new FilteredDataModel<ClaimModel>()
                    {
                        Data = dataList
                    };
            }

            var role = Uow.Roles.GetById(request.RoleId);

            if (role == null) throw HttpError.NotFound("No such role exists.");

            var claims = role.Claims.ToList();

            dataList = claims.Select(roleClaim => new ClaimModel()
                {
                    Name = roleClaim.Name
                }).ToList();

            return new FilteredDataModel<ClaimModel>()
                {
                    Data = dataList
                };
        }

    }

    public class ClaimModel
    {
        public string Name { get; set; }
    }

    public class FilterParametersClaims : FilterArgumentsClaims
    {

    }
}