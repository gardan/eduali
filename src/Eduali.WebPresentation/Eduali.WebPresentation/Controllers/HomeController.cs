using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Eduali.WebPresentation.Models;

namespace Eduali.WebPresentation.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public async Task<ActionResult> Trainings(TrainingsGetModel request)
        {
            var client = new HttpClient();
            var baseUrl = Request.Url.GetLeftPart(UriPartial.Authority);
            client.BaseAddress = new Uri(baseUrl);
            var result = await client.GetStringAsync("app/api/opentrainings?format=json");

            var deserializedResult = new JavaScriptSerializer().Deserialize<TrainingsResultModel>(result);

            var subjects = new SubjectModel[]
                {
                    new SubjectModel() {Id = 1, Name = "asdasdas" },
                    new SubjectModel() {Id = 2, Name = "9347t8ehg" }
                };

            if (request.C != null)
            {
                foreach (var subjectModel in subjects)
                {
                    if (Array.Exists(request.C, i => i == subjectModel.Id))
                    {
                        subjectModel.Selected = true;
                    }
                }
            }
            
            var model = new ViewTrainingModel()
                {
                    Data = deserializedResult.Data,
                    Query = request.Query,
                    Subjects = subjects
                };
            return View(model);
        }

        public ActionResult Customers()
        {
            return View();
        }

        public ActionResult Companies()
        {
            return View();
        }

        public ActionResult Students()
        {
            return View();
        }

        public ActionResult Trainers()
        {
            return View();
        }

        public ActionResult NewAccount()
        {
            return View();
        }
    }
}
