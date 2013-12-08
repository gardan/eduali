using System.Collections.Generic;
using System.Linq;
using Ilc.Data.Models;
using Ilc.Web.Models;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class TrainerToTrainerModel : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name ||
                   (c.SourceProp.Name == "UserProfile" && c.TargetProp.Name == "UserInfo");
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "UserProfile" && c.TargetProp.Name == "UserInfo")
            {
                var user = (UserProfile)c.SourceProp.Value;
                return new UserInfoModel().InjectFrom(user.UserDetails) as UserInfoModel;
            }
            if (c.SourceProp.Name == "Subjects" && c.TargetProp.Name == "Subjects")
            {
                var subjects = c.SourceProp.Value as IEnumerable<Subject>;
                if (subjects == null) return null;
                return subjects.Select(s => new SubjectModel().InjectFrom(s) as SubjectModel).ToArray();
            }

            return base.SetValue(c);
        }
    }
}