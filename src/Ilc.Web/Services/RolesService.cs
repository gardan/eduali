using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class RolesService : Service
    {

        public IRolesService Roles { get; set; }

        public FilteredDataModel<RoleModel> Get(FilterParametersRoles request)
        {
            var results = Roles.GetFiltered(request);
            return new FilteredDataModel<RoleModel>()
                {
                    Data = results.Data.Select(r => new RoleModel().InjectFrom<RoleToModel>(r) as RoleModel).ToList(),
                    TotalDisplayRecords = results.TotalDisplayRecords,
                    TotalRecords = results.TotalRecords
                };
        }

        public HttpResult Post(CreateRoleModel request)
        {
            var role = new Role()
                {
                    RoleName = request.Name,
                    Claims = new List<RoleClaim>()
                };

            foreach (var roleClaimModel in request.Claims)
            {
                role.Claims.Add(new RoleClaim()
                    {
                        Name = roleClaimModel.Name,
                        Value = true.ToString()
                    });
            }

            Roles.Create(role);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class CreateRoleModel
    {
        public string Name { get; set; }
        public RoleClaimModel[] Claims { get; set; }
    }

    public class RoleModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class FilterParametersRoles : FilterArgumentsRoles { }
}