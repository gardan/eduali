using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using Ilc.Web.Authentication.Contracts;

namespace Ilc.Web.Controllers
{
    // [Authorize]
    public class HomeController : Controller
    {
        public IIdentityAuthenticationManager AuthManager { get; set; }

        public ViewResult Index()
        {
            ControllerContext.HttpContext.Response.Cookies.Add(new HttpCookie("LoggedIn", AuthManager.IsAuthenticated().ToString()));
            return View();
        }
    }
}