using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
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
            var result = await client.GetStringAsync("app/api/opentrainings?format=json&query=" + HttpUtility.UrlEncode(request.Query));

            var deserializedResult = new JavaScriptSerializer().Deserialize<TrainingsResultModel>(result);

            var model = new ViewTrainingModel()
                {
                    Data = deserializedResult.Data,
                    Query = request.Query,
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
