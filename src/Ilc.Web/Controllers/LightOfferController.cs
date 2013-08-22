using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ilc.Data.Contracts;
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


    public class PdfController : Controller
    {
        public IUow Uow { get; set; }

        public ViewResult Offer(int id)
        {
            var offer = new LightOfferModel() { StartDate = DateTimeOffset.UtcNow };
            var offer2 = Uow.Offers.GetById(id);

            offer.NoLessons = offer2.NoLessons;
            offer.LessonDuration = offer2.LessonDuration;
            offer.PossibleCosts = offer2.Price.ToString();

            return new PdfResult(offer);
        }
    }
}