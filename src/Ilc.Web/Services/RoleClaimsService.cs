using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class RoleClaimsService : Service
    {
        public IUow Uow { get; set; }

        public HttpResult Post(CreateRoleClaimsModel request)
        {
            var role = Uow.Roles.GetById(request.RoleId);
            var currentClaims = role.Claims; // We just need to load the claims.

            foreach (var roleClaimModel in request.Claims)
            {
                role.Claims.Add(new RoleClaim()
                    {
                        Name = roleClaimModel.Name,
                        Value = true.ToString()
                    });
            }
            Uow.Roles.Update(role);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class CreateRoleClaimsModel
    {
        public int RoleId { get; set; }
        public RoleClaimModel[] Claims { get; set; }
    }

    public class RoleClaimModel
    {
        public string Name { get; set; }
    }
}