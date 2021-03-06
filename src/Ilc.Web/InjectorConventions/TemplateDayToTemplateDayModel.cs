﻿using System;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class TemplateDayToTemplateDayModel : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name;
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "StartDate" || c.SourceProp.Name == "EndDate")
            {
                var ret = ((DateTimeOffset)c.SourceProp.Value).DateTime;
                return ((DateTimeOffset) c.SourceProp.Value).DateTime;
            }
            return base.SetValue(c);
        }
    }
}