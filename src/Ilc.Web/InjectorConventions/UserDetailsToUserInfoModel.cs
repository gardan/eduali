using System;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class UserDetailsToUserInfoModel : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name;
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "DateOfBirth")
            {
                if (c.SourceProp.Value == null) return null;
                return ((DateTimeOffset) c.SourceProp.Value).DateTime;
            }
            return base.SetValue(c);
        }
    }
}