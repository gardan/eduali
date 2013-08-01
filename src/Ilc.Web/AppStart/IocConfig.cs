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
            // i'm doing this manually, because the Funq resolver tries to resolve all public properties, 
            // including a Dictionary, and it can't do that so it throws an exception.
            container.Register<IUow>(c => new Uow(new RepositoryProvider(new RepositoriesFactories()))).ReusedWithin(ReuseScope.Request);

            container.RegisterAutoWiredAs<IdentityAuthenticationManager, IIdentityAuthenticationManager>().ReusedWithin(ReuseScope.Request); 
            container.RegisterAutoWiredAs<IdentityStoreManager, IIdentityStoreManager>().ReusedWithin(ReuseScope.Request);
            container.RegisterAutoWiredAs<UsersService, IUsersService>().ReusedWithin(ReuseScope.Request); 
            container.RegisterAutoWiredAs<TrainingsService, ITrainingsService>().ReusedWithin(ReuseScope.Request);
            container.RegisterAutoWiredAs<CustomersService, ICustomersService>().ReusedWithin(ReuseScope.Request); 
            container.RegisterAutoWiredAs<StudentsService, IStudentsService>().ReusedWithin(ReuseScope.Request); 
        }
    }
}