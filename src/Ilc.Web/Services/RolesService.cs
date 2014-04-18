using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

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

        public HttpResult Put(RoleModel request)
        {
            var role = Roles.GetById(request.Id);
            role.RoleName = request.Name;

            Roles.Update(role);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Delete(RoleModel request)
        {
            // TODO: move to attribute filter
            var role = Roles.GetById(request.Id);
            
            if (!role.CanDelete)
            {
                throw new Ilc.Core.Exceptions.NotAllowedException("Cannot delete predefined role.");
            }

            if (request.Force == false && role.UserProfiles.Any())
            {
                throw new ArgumentException("Role belongs to users.");
            }

            Roles.Delete(request.Id);

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

        public bool Force { get; set; } // method: DELETE
    }

    public class FilterParametersRoles : FilterArgumentsRoles { }
}