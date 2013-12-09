using System.Collections.Generic;
using System.Linq;
using Ilc.Data.Models;
using Ilc.Web.Models;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class CustomerToCustomerModel : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name;
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "ContactPersons" && c.TargetProp.Name == "ContactPersons")
            {
                var contacts = c.SourceProp.Value as ICollection<ContactPerson>;
                if (contacts.Count == 0) return null;
                return contacts.Select(cp => new ContactPersonModel()
                    {
                        Id = cp.Id,
                        IsMain = cp.UserProfile.Roles.Exists(r => r.RoleName == "Customer Contact"),
                        Name = cp.UserProfile.UserDetails.FirstName + " " + cp.UserProfile.UserDetails.LastName
                    }).ToList();
            }

            return base.SetValue(c);
        }
    }
}