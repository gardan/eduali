using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Configuration;
using Ilc.Core.Contracts;
using Ilc.Web.Contracts;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;
using ServiceStack.WebHost.Endpoints;

namespace Ilc.Web.Services
{
    public class UserSettingsService : Service
    {
        public IUsersService Users { get; set; }

        

    }

    
}