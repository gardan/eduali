using System;
using System.Web.Mvc;
using Ilc.Data.Contracts;
using Ilc.Web.Models;
using RazorPDF;

namespace Ilc.Web.Controllers
{
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

            return new PdfResult(offer, "Offer");
        }
    }
}