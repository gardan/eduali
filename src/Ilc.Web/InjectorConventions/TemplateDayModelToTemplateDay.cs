using System;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class TemplateDayModelToTemplateDay : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name;
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "StartDate" || c.SourceProp.Name == "EndDate")
            {
                return new DateTimeOffset((DateTime)c.SourceProp.Value, TimeSpan.Zero);
            }
            return base.SetValue(c);
        }
    }
}