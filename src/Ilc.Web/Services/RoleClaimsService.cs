using System.Linq;
using System.Net;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using ServiceStack;

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

        public HttpResult Delete(DeleteRoleClaimModel request)
        {
            var role = Uow.Roles.GetById(request.RoleId);
            var roleClaim = role.Claims.FirstOrDefault(rc => rc.Name == request.Name);

            if (roleClaim == null) return new HttpResult() {StatusCode = HttpStatusCode.OK};

            Uow.RoleClaims.Delete(roleClaim.Id);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class DeleteRoleClaimModel
    {
        public int RoleId { get; set; }
        public string Name { get; set; } // Claim name
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