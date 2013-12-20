using System;
using Ilc.Data.Models;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class AvailabilityToAvailabilityModel : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name ||
                (c.SourceProp.Name == "TrainerId" && c.TargetProp.Name == "ResourceId");
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "TrainerId" && c.TargetProp.Name == "ResourceId")
            {
                return c.SourceProp.Value;
            }
            if (c.SourceProp.Name == "StartDate" || c.SourceProp.Name == "EndDate")
            {
                return ((DateTimeOffset) c.SourceProp.Value).DateTime;
            }

            return base.SetValue(c);
        }
    }
}