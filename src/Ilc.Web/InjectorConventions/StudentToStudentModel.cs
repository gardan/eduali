using Ilc.Web.Models;
using Omu.ValueInjecter;

namespace Ilc.Web.InjectorConventions
{
    public class StudentToStudentModel : ConventionInjection
    {
        protected override bool Match(ConventionInfo c)
        {
            return c.SourceProp.Name == c.TargetProp.Name;
        }

        protected override object SetValue(ConventionInfo c)
        {
            if (c.SourceProp.Name == "Customer" && c.TargetProp.Name == "Customer")
            {
                return new CustomerStudentModel().InjectFrom(c.SourceProp.Value) as CustomerStudentModel;
            }

            return base.SetValue(c);
        }
    }
}