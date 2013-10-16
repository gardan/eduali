using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
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

    }

    public class RoleModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class FilterParametersRoles : FilterArgumentsRoles { }
}