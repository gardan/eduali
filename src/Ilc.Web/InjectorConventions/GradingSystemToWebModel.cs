using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Data.Models;
using Ilc.Web.Services;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class GradingSystemToWebModel : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name;
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "Grades")
            {
                var list = c.SourceProp.Value as ICollection<Grade>;
                return list.Select(g => new GradeModel().InjectFrom(g) as GradeModel).OrderBy(gs => gs.Order).ToArray();
            }
            return base.SetValue(c);
        }
    }
}