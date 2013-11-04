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

            return base.SetValue(c);
        }
    }
}