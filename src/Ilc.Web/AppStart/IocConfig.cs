using Funq;
using Ilc.Core.Contracts;
using Ilc.Core.Services;
using Ilc.Web.Authentication;
using Ilc.Web.Authentication.Contracts;

namespace Ilc.Web.AppStart
{
    public static class IocConfig
    {
        public static void Init(Container container)
        {
            container.RegisterAutoWiredAs<IdentityAuthenticationManager, IIdentityAuthenticationManager>();
            container.RegisterAutoWiredAs<IdentityStoreManager, IIdentityStoreManager>();
            container.RegisterAutoWiredAs<UsersService, IUsersService>();
        }
    }
}