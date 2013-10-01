using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace Ilc.Web.Controllers
{
    public class ZipController : Controller
    {

        public FileResult Offers(OffersParameters request)
        {
            var offer = new WebClient().DownloadData("http://localhost:54877/pdf/offer/1");

            ZipArchive archive;

            using (var memStream = new MemoryStream())
            {
                using (archive = new ZipArchive(memStream, ZipArchiveMode.Update,false))
                {
                    var entry = archive.CreateEntry("Offer1.pdf");

                    using (var fileStream = new MemoryStream(offer))
                    {
                        using (var zipStream = entry.Open())
                        {
                            fileStream.CopyTo(zipStream);
                        }
                    }
                    
                }
                return new FileContentResult(memStream.ToArray(), "application/zip")
                    {
                        FileDownloadName = "Zip1.zip"
                    };
            }

        }
    }

    public class OffersParameters
    {
        public int TrainingId { get; set; }
    }
}