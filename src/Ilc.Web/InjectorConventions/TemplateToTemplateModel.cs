using System.Collections.Generic;
using System.Linq;
using Ilc.Data.Models;
using Ilc.Web.Services;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class TemplateToTemplateModel : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name;
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "TemplateDays")
            {
                var templateDays = c.SourceProp.Value as ICollection<TemplateDay>;
                if (templateDays == null) return new TemplateDayModel[] {};
                return templateDays.Select(d => new TemplateDayModel().InjectFrom<TemplateDayToTemplateDayModel>(d) as TemplateDayModel).ToArray();
            }
            return base.SetValue(c);
        }
    }
}