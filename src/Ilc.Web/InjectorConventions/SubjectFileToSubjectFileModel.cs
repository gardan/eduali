using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Web.Models;
using Ilc.Web.Services;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class SubjectFileToSubjectFileModel : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name ||
                c.SourceProp.Name == "CreateDate" && c.TargetProp.Name == "CreatedDate";
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "Creator" && c.TargetProp.Name == "Creator")
            {
                return new UserModel().InjectFrom<UserProfileToUserModel>(c.SourceProp.Value);
            }
            if (c.SourceProp.Name == "CreateDate" && c.TargetProp.Name == "CreatedDate")
            {
                // return datetime from datetime offset
                return ((DateTimeOffset) c.SourceProp.Value).DateTime;
            }

            return base.SetValue(c);
        }
    }
}