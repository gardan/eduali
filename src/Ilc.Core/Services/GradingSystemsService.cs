﻿using System;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class GradingSystemsService : IGradingSystemsService
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }

        public void Create(GradingSystem gradingSystem)
        {
            var user = Users.GetByUsername();
            gradingSystem.CompanyId = user.CompanyId;

            Uow.GradingSystems.Add(gradingSystem);
            Uow.Commit();
        }
    }
}