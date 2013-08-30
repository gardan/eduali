using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Ilc.Web.Controllers
{
    
    public class HomeController : Controller
    {
        public ViewResult Index()
        {
            return View();
        }
    }
}