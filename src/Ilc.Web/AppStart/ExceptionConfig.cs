using System.Security.Authentication;
using ServiceStack.WebHost.Endpoints;

namespace Ilc.Web.AppStart
{
    public class ExceptionConfig
    {
        public static void Configure(AppHost appHost)
        {
            appHost.SetConfig(new EndpointHostConfig()
                {
                    MapExceptionToStatusCode = {
                        { typeof(AuthenticationException), 401 } 
                    }
                });
        }
    }
}