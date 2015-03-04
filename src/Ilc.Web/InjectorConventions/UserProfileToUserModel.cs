using System;
using System.Collections.Generic;
using System.Linq;
using Ilc.Data.Models.SimpleMembership;
using Ilc.Web.Models;
using Ilc.Web.Services;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class UserProfileToUserModel : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name ||
                (c.SourceProp.Name == "UserDetails" && c.TargetProp.Name == "UserInfo");
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "UserDetails" && c.TargetProp.Name == "UserInfo")
            {
                return new UserInfoModel().InjectFrom<UserDetailsToUserInfoModel>(c.SourceProp.Value);
            }
            if (c.SourceProp.Name == "Roles" && c.TargetProp.Name == "Roles")
            {
                return
                    ((List<Role>) c.SourceProp.Value).Select(
                        r => new RoleModel().InjectFrom<RoleToModel>(r) as RoleModel).ToList();
            }
            return base.SetValue(c);
        }
    }
}