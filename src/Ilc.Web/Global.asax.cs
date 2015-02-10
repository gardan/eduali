using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.UI;
using Ilc.Data;
using Ilc.Web.AppStart;
using Ilc.Web.Cms;

namespace Ilc.Web
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            new AppHost().Init();
            RouteMvcConfig.RegisterRoutes(RouteTable.Routes);
            HostingEnvironment.RegisterVirtualPathProvider(new MyVirtualPathProvider());


            // set ef initializer
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<AppContext, Data.Migrations.Configuration>());
            //var context = new AppContext();
            //context.Database.Initialize(true);
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_EndRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}