using System.Collections.Generic;
using System.Linq;
using Ilc.Data.Models;
using Ilc.Web.Services.Tasks.Training;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class AssesmentModelToStudentInterview : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name;
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "AssesmentResults")
            {
                var list = c.SourceProp.Value as List<CreateInterviewResultModel>;
                return list.Select(ir => new AssesmentResult().InjectFrom(ir) as AssesmentResult).ToList();
            }
            return base.SetValue(c);
        }
    }
}