using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ilc.Web.Authentication.Contracts;
using Ilc.Web.Models;

namespace Ilc.Web.Controllers
{
    public class AccountController : Controller
    {
        public IIdentityAuthenticationManager AuthenticationManager { get; set; }

        [HttpGet]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        public ActionResult Login(LoginViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                if (AuthenticationManager.CheckPasswordAndSignIn(this.HttpContext, model.Username, model.Password, model.RememberMe))
                {
                    Debug.WriteLine("User authenticated!");
                    return RedirectToLocal(returnUrl);
                }
                Debug.WriteLine("User failed authentication.");
            }

            return Redirect("Login");
        }


        public ActionResult Logout()
        {
            AuthenticationManager.Logout();
            return RedirectToAction("Login", "Account");
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }
    }
}