using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Data.Models;
using Ilc.Web.Models;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class TrainingToWebModel : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name;
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "Owners" && c.TargetProp.Name == "Owners")
            {
                var users = c.SourceProp.Value as ICollection<UserProfile>;
                users.Select()
                return new UserModel[]
                    {
                        new UserModel() {Email = "something@hell.com", Id = 1, Username = "manole"}, 
                    };
            }

            return base.SetValue(c);
        }
    }
}