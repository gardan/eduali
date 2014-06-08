using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Web.Controllers
{
    public class DocumentsController : Controller
    {
        public IUow Uow { get; set; }

        public long UnixTimeNow()
        {
            var timeSpan = (DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0));
            return (long)timeSpan.TotalSeconds;
        }

        [HttpGet]
        public FileStreamResult Get(int id = 0, int modelId = 0, int parentModelId = 0)
        {
            var toolsPath = Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath(System.Web.HttpRuntime.AppDomainAppVirtualPath), "tools");
            var toolPath = Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath(System.Web.HttpRuntime.AppDomainAppVirtualPath), "tools", "wkhtmltopdf.exe");
            var pdfPath = Path.Combine(Path.Combine(toolsPath), string.Format("{0}.pdf", Guid.NewGuid().ToString()));
            var requestUrl = ConfigurationSettings.AppSettings["ApplicationUrl"];
            
            var args =
                string.Format(@"{3}/documents/gethtml/{0}?modelId={1}&parentModelId={2} ", id, modelId, parentModelId, requestUrl) + pdfPath;
            var startInfo = new ProcessStartInfo()
                {
                    FileName = toolPath,
                    Arguments = args,
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true
                };
            using (var proc = Process.Start(startInfo))
            {

                using (StreamReader reader = proc.StandardError)
                {
                    string procResult = reader.ReadToEnd();
                    Console.WriteLine(procResult);
                }
            }


            var file = System.IO.File.ReadAllBytes(pdfPath);
            System.IO.File.Delete(pdfPath);

            var memoryStream = new MemoryStream();
            memoryStream.Write(file, 0, file.Length);
            memoryStream.Position = 0;

            return new FileStreamResult(memoryStream, "application/pdf");
        }

        [HttpGet]
        public ViewResult GetHtml(int id = 0, int modelId = 0, int parentModelId = 0)
        {
            if (id == 0) throw new KeyNotFoundException();
            if (modelId == 0) throw new KeyNotFoundException();

            var fileTemplate = Uow.FileTemplates.GetById(id);

            if (fileTemplate == null) throw new KeyNotFoundException();

            object dataModel = null;

            switch (fileTemplate.Type)
            {
                case FileTemplateType.Student:
                    dataModel = Uow.Students.GetById(modelId);
                    break;
                case FileTemplateType.Training:
                    dataModel = Uow.Trainings.GetById(modelId);
                    break;
                case FileTemplateType.Offer:
                    dataModel = Uow.Offers.GetById(modelId);
                    break;
                default:
                    throw new NotImplementedException();
            }
            if (dataModel == null) throw new KeyNotFoundException();

            object model = null;

            // No parent, just show collection from all trainings
            if (parentModelId == 0)
            {
                if (typeof(Training) == dataModel.GetType())
                {

                }
                var training = (Training)dataModel;
                model = new TrainingDocModel()
                    {
                        CustomerName = training.Customer.Name
                    };
            }
            else
            {
                switch (fileTemplate.Type)
                {
                    case FileTemplateType.Student:
                        var student = (Student)dataModel;
                        model = new StudentFromTrainingDocModel()
                            {
                                Name = string.Format("{0} {1}", student.UserProfile.UserDetails.FirstName, student.UserProfile.UserDetails.LastName),
                            };
                        break;
                    case FileTemplateType.Offer:
                        var offer = (TrainingOffer)dataModel;
                        model = new OfferFromTrainingDocModel()
                            {
                                Price = offer.Price
                            };
                        break;
                }
            }

            var timpstamp = UnixTimeNow(); // is used to recompile the view everytime.
            var filename = string.Format("{0}-{1}-dynamic_document.cshtml", id, timpstamp);

            return View(
                System.IO.Path.GetFileNameWithoutExtension("~/documents/" + filename),
                model);
        }
    }

    public class StudentFromTrainingDocModel
    {
        public string Name { get; set; }
    }

    public class TrainingDocModel
    {
        public string CustomerName { get; set; }
    }

    public class OfferFromTrainingDocModel
    {
        public decimal Price { get; set; }
    }
}