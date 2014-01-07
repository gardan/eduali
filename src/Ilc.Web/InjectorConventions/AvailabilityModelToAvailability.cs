using System;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class AvailabilityModelToAvailability : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name ||
                   (c.SourceProp.Name == "ResourceId" && c.TargetProp.Name == "TrainerId");
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "ResourceId" && c.TargetProp.Name == "TrainerId")
            {
                return c.SourceProp.Value;
            }
            if (c.SourceProp.Name == "StartDate" || c.SourceProp.Name == "EndDate")
            {
                return new DateTimeOffset((DateTime)c.SourceProp.Value);
            }

            return base.SetValue(c);
        }
    }
}