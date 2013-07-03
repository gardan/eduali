﻿using Ilc.Web.Models;
using ServiceStack.ServiceHost;

namespace Ilc.Web.AppStart
{
    public class RouteConfig
    {
        public static void Init(IServiceRoutes routes)
        {
            routes.Add<FilterParametersBase>("/api/transfers", "GET");
            routes.Add<CreateTransferModel>("/api/transfers", "POST");
        }
    }
}