using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core;
using Ilc.Data.Contracts;
using Ilc.Web.Models;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class ClaimsService : Service
    {
        public IUow Uow { get; set; }

        public FilteredDataModel<ClaimModel> Get(FilterParametersClaims request)
        {
            var role = Uow.Roles.GetById(request.RoleId);
            var claims = role.Claims.ToList();

            var dataList = claims.Select(roleClaim => new ClaimModel()
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