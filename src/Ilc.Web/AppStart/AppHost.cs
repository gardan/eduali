using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using Funq;
using ServiceStack.Mvc;
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
            JsConfig.DateHandler = JsonDateHandler.ISO8601;
            ControllerBuilder.Current.SetControllerFactory(new FunqControllerFactory(container));

            IocConfig.Init(container);
            RouteConfig.Init(Routes);
        }
    }
}