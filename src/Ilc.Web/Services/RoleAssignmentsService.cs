﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Data.Contracts;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class RoleAssignmentsService : Service
    {

        public IUow Uow { get; set; }

        public HttpResult Post(CreateRoleAssignmentModel request)
        {
            var role = Uow.Roles.GetById(request.RoleId);
            var user = Uow.UserProfiles.GetById(request.UserId);

            role.UserProfiles.ToList();

            role.UserProfiles.Add(user);

            Uow.Roles.Update(role);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

    }

    public class CreateRoleAssignmentModel
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }    
    }
}