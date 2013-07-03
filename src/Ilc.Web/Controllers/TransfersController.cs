using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ilc.Web.Models;
using RazorPDF;

namespace Ilc.Web.Controllers
{
    public class TransfersController : Controller
    {

        public ActionResult Sample()
        {
            return View();
        }

        public ActionResult Pdf(int id)
        {
            var transfer = TransfersRepo.Get(id);
            var result = new PdfResult(transfer);

            return result;
        }

    }
}