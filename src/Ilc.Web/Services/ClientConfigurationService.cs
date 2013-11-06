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

        public ClientConfigurationModel Get(ClientConfigurationModel request)
        {
            return new ClientConfigurationModel()
                {
                    Username = Users.GetByUsername().Username
                };
        }
    }

    public class ClientConfigurationModel
    {
        public string Username { get; set; }
    }
}