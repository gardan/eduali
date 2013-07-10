using Funq;
using Ilc.Web.Authentication;
using Ilc.Web.Authentication.Contracts;

namespace Ilc.Web.AppStart
{
    public static class IocConfig
    {
        public static void Init(Container container)
        {
            container.RegisterAutoWiredAs<IdentityAuthenticationManager, IIdentityAuthenticationManager>();
        }
    }
}