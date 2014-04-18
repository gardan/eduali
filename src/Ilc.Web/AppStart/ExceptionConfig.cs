using Ilc.Core.Exceptions;
using ServiceStack;
using AuthenticationException = System.Security.Authentication.AuthenticationException;

namespace Ilc.Web.AppStart
{
    public class ExceptionConfig
    {
        public static void Configure(AppHost appHost)
        {
            appHost.SetConfig(new HostConfig()
                {
                    MapExceptionToStatusCode = {
                        { typeof(AuthenticationException), 401 },
                        { typeof(Ilc.Core.Exceptions.NotAllowedException), 405 }
                    }
                });
        }
    }
}