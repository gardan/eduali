using System;
using Ilc.Core;
using Ilc.Data.Models;
using Ilc.Web.Models;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class StudentToStudentModel : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name  ||
                (c.SourceProp.Name == "UserProfile" && c.TargetProp.Name == "Email") ||
                (c.SourceProp.Name == "UserProfile" && c.TargetProp.Name == "UserInfo");
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "UserProfile" && c.TargetProp.Name == "Email")
            {
                var user = (UserProfile)c.SourceProp.Value;
                return user.Email;
            }
            if (c.SourceProp.Name == "Customer" && c.TargetProp.Name == "Customer")
            {
                return new CustomerStudentModel().InjectFrom(c.SourceProp.Value) as CustomerStudentModel;
            }
            if (c.SourceProp.Name == "UserProfile" && c.TargetProp.Name == "UserInfo")
            {
                var user = (UserProfile) c.SourceProp.Value;
                return new UserInfoModel().InjectFrom<UserDetailsToUserInfoModel>(user.UserDetails) as UserInfoModel;
            }

            return base.SetValue(c);
        }
    }
}