using System;
using System.Collections.Generic;
using Funq;
using Ilc.Core.Contracts;
using Ilc.Core.Services;
using Ilc.Data;
using Ilc.Data.Contracts;
using Ilc.Data.Helpers;
using Ilc.Infrastructure.Contracts;
using Ilc.Infrastructure.Services;
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
            container.RegisterAutoWiredAs<TrainersService, ITrainersService>().ReusedWithin(ReuseScope.Request);
            container.RegisterAutoWiredAs<GridConfigsService, IGridConfigsService>().ReusedWithin(ReuseScope.Request);
            container.RegisterAutoWiredAs<OffersService, IOffersService>().ReusedWithin(ReuseScope.Request);
            container.RegisterAutoWiredAs<MembershipService, IMembershipService>().ReusedWithin(ReuseScope.Request);
            container.RegisterAutoWiredAs<RolesService, IRolesService>().ReusedWithin(ReuseScope.Request);
            container.RegisterAutoWiredAs<ClaimsService, IClaimsService>().ReusedWithin(ReuseScope.Request);
            container.RegisterAutoWiredAs<SubjectsService, ISubjectsService>().ReusedWithin(ReuseScope.Request);
            container.RegisterAutoWiredAs<StatusService, IStatusService>().ReusedWithin(ReuseScope.Request);
            container.RegisterAutoWiredAs<StatusDefinitionsService, IStatusDefinitionsService>().ReusedWithin(ReuseScope.Request);
            container.RegisterAutoWiredAs<GradesService, IGradesService>().ReusedWithin(ReuseScope.Request);
            container.RegisterAutoWiredAs<ContactsService, IContactsService>().ReusedWithin(ReuseScope.Request);
            container.RegisterAutoWiredAs<AvailabilityService, IAvailabilityService>().ReusedWithin(ReuseScope.Request);

            container.RegisterAutoWiredAs<StatisticsService, IStatisticsService>().ReusedWithin(ReuseScope.Request);            
        }
    }
}