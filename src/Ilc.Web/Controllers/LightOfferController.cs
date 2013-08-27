using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ilc.Web.Models;
using RazorPDF;

namespace Ilc.Web.Controllers
{
    public class LightOfferController : Controller
    {
        public ViewResult Pdf(int id)
        {
            var offer = new LightOfferModel() {NoLessons = 10, PossibleCosts = "3000$", StartDate = DateTimeOffset.UtcNow, LessonDuration = 2};

            var customer = new {Name = "CompanyX"};

            var filename = customer.Name + "-" + "InitialOffer.pdf";
            Response.AddHeader("Content-Disposition", "attachment; filename=" + filename);
            return new PdfResult(offer);
        }
    }
}