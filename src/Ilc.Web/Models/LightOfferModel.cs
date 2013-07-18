using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ilc.Web.Models
{
    public class LightOfferModel
    {
        public string PossibleCosts { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public int NoLessons { get; set; }
        public int LessonDuration { get; set; }
    }
}