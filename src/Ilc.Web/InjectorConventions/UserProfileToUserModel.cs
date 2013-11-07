using System;
using Ilc.Web.Models;
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
                return new UserInfoModel().InjectFrom(c.SourceProp.Value);
            }
            return base.SetValue(c);
        }
    }
}