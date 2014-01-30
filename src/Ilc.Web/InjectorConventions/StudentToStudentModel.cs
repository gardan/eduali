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
                (c.SourceProp.Name == "UserProfile" && c.TargetProp.Name == "UserInfo");
        }

        protected override object SetValue(ConventionInfo c)
        {
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

    public class UserDetailsToUserInfoModel : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name;
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "Gender")
            {
                var gender = Genders.GetGender(((int?) c.SourceProp.Value).GetValueOrDefault());
                return gender == null ? "" : gender.Name;
            }
            return base.SetValue(c);
        }
    }
}