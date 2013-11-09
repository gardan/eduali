using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core.Contracts;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class ClientConfigurationService : Service
    {
        public IUsersService Users { get; set; }
        public IClaimsService Claims { get; set; }

        public ClientConfigurationModel Get(ClientConfigurationModel request)
        {
            var usersClaims = Claims.GetByUserId(Users.GetByUsername().Id);

            return new ClientConfigurationModel()
                {
                    Username = Users.GetByUsername().Username,
                    Claims = usersClaims.ToArray()
                };
        }
    }

    public class ClientConfigurationModel
    {
        public string Username { get; set; }
        public string[] Claims { get; set; }
    }
}