using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class RoleToModel : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name ||
                (c.SourceProp.Name == "RoleName" && c.TargetProp.Name == "Name");
        }
    }
}