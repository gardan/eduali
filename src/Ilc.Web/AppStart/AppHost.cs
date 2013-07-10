using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using Funq;
using ServiceStack.Text;
using ServiceStack.WebHost.Endpoints;

namespace Ilc.Web.AppStart
{
    public class AppHost : AppHostBase
    {
        public AppHost() : base("Api", typeof(AppHost).Assembly) { }

        public override void Configure(Container container)
        {
            JsConfig.EmitCamelCaseNames = true;
            JsConfig.ExcludeTypeInfo = true;

            // ControllerBuilder.Current.SetControllerFactory(new FunqControllerFactory(container));

            RouteConfig.Init(Routes);
        }
    }
}