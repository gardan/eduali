using System;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class UserInfoModelToUserDetails : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name;
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "DateOfBirth")
            {
                var dobOffset = new DateTimeOffset(DateTime.SpecifyKind((DateTime)c.SourceProp.Value, DateTimeKind.Unspecified), TimeSpan.Zero);
                return new DateTimeOffset?(dobOffset);
            }
            return base.SetValue(c);
        }
    }
}