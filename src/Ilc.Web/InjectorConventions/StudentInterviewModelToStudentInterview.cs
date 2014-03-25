using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Data.Models;
using Ilc.Web.Services.Tasks.Training;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class StudentInterviewModelToStudentInterview : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name;
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "InterviewResults")
            {
                var list = c.SourceProp.Value as List<InterviewResultModel>;
                return list.Select(ir => new InterviewResult().InjectFrom(ir) as InterviewResult).ToList();
            }
            return base.SetValue(c);
        }
    }
}