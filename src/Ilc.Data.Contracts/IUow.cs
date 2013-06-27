﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;

namespace Ilc.Data.Contracts
{
    public interface IUow
    {
        // Save pending changes to the data store
        void Commit();

        // Repositories
        IUserProfileRepository UserProfiles { get; }
        IRepository<Employee> Employees { get; }
        IRepository<RoleClaim> Claims { get; }
        IRolesRepository Roles { get; }
        IRepository<UserProfileWorkspaceView> UserProfileWorkspaceViews { get; }
    }
}
