using System.Web;
using System.Web.Mvc;
using Funq;
using Ilc.Web.Models;
using ServiceStack;
using ServiceStack.Mvc;
using ServiceStack.Text;
using AuthenticationException = System.Security.Authentication.AuthenticationException;

namespace Ilc.Web.AppStart
{
    public class AppHost : AppHostHttpListenerBase
    {
        public AppHost() : base("Api", typeof(AppHost).Assembly) { }

        public override void Configure(Container container)
        {
            JsConfig.EmitCamelCaseNames = true;
            JsConfig.ExcludeTypeInfo = true;
            JsConfig.DateHandler = DateHandler.ISO8601;

            JsConfig<FilteredDataModel<Services.LessonModel>>.EmitCamelCaseNames = false;
            JsConfig<Services.LessonModel>.EmitCamelCaseNames = false;

            ControllerBuilder.Current.SetControllerFactory(new FunqControllerFactory(container));

            IocConfig.Init(container);
            RouteConfig.Init(Routes);
            ContentTypeConfig.Configure(this);
            // ExceptionConfig.Configure(this);

            SetConfig(new HostConfig()
            {
                // ServiceStackHandlerFactoryPath = "",
                WriteErrorsToResponse = true,
                MapExceptionToStatusCode = {
                        { typeof(AuthenticationException), 401 }
                    }
            });
        }
    }
}