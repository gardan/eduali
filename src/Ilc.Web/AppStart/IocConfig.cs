using System;
using System.Collections.Generic;
using Funq;
using Ilc.Core.Contracts;
using Ilc.Core.Services;
using Ilc.Data;
using Ilc.Data.Contracts;
using Ilc.Data.Helpers;
using Ilc.Web.Authentication;
using Ilc.Web.Authentication.Contracts;

namespace Ilc.Web.AppStart
{
    public static class IocConfig
    {
        public static void Init(Container container)
        {
            container.Register<IUow>(c => new Uow(new RepositoryProvider(new RepositoriesFactories())));
            // container.RegisterAutoWired<RepositoriesFactories>();
            // container.RegisterAutoWiredAs<RepositoryProvider, IRepositoryProvider>();

            container.RegisterAutoWiredAs<IdentityAuthenticationManager, IIdentityAuthenticationManager>();
            container.RegisterAutoWiredAs<IdentityStoreManager, IIdentityStoreManager>();
            container.RegisterAutoWiredAs<UsersService, IUsersService>();
            container.RegisterAutoWiredAs<TrainingsService, ITrainingsService>();
        }
    }
}