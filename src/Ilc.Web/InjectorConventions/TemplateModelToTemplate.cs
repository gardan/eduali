using System.Collections.Generic;
using System.Linq;
using Ilc.Data.Models;
using Ilc.Web.Services;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class TemplateModelToTemplate : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name;
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "TemplateDays")
            {
                var templateDays = c.SourceProp.Value as ICollection<TemplateDayModel>;
                if (templateDays == null) return new List<Template>();
                return templateDays.Select(d => new TemplateDay().InjectFrom<TemplateDayModelToTemplateDay>(d) as TemplateDay).ToList();
            }
            return base.SetValue(c);
        }
    }
}