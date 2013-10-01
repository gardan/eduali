using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using Ilc.Data.Contracts;

namespace Ilc.Web.Controllers
{
    public class ZipController : Controller
    {

        public IUow Uow { get; set; }

        public FileResult Offers(OffersParameters request)
        {
            var client = new WebClient();
            var training = Uow.Trainings.GetById(request.TrainingId);
            var offerEntities = Uow.Offers.GetAll().Where(o => o.TrainingId == request.TrainingId).ToList();
            var offers = new List<byte[]>();

            foreach (var trainingOffer in offerEntities)
            {
                var host = "";
                var port = 0;
                var scheme = "";
                if (Request.Url != null)
                {
                    host = Request.Url.Host;
                    port = Request.Url.Port;
                    scheme = Request.Url.Scheme;
                }

                var url = scheme + "://" + host + ":" + port + "/pdf/offer/" + trainingOffer.Id;

                offers.Add(new WebClient().DownloadData(url));
            }
            
            using (var memStream = new MemoryStream())
            {
                using (var archive = new ZipArchive(memStream, ZipArchiveMode.Update,false))
                {
                    var i = 0;
                    foreach (var offerFile in offers)
                    {
                        var innerOffer = offerEntities[i];
                        var name = "Offer-" + innerOffer.Id + "-" + innerOffer.Training.Customer.Name + ".pdf";
                        var entry = archive.CreateEntry(name);

                        using (var fileStream = new MemoryStream(offerFile))
                        {
                            using (var zipStream = entry.Open())
                            {
                                fileStream.CopyTo(zipStream);
                            }
                        }
                        i++;
                    }
                }
                return new FileContentResult(memStream.ToArray(), "application/zip")
                    {
                        FileDownloadName = training.Customer.Name + "-" + training.Subject.Name + ".zip"
                    };
            }

        }
    }

    public class OffersParameters
    {
        public int TrainingId { get; set; }
    }
}