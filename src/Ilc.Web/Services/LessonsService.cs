using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using Ilc.Web.Models;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;
using ServiceStack.Text;

namespace Ilc.Web.Services
{
    public class LessonsService : Service
    {

        public FilteredDataModel<LessonModel> Get(FilterParametersLessons request)
        {
            var res = new FilteredDataModel<LessonModel>()
            {
                Data = new List<LessonModel>()
                        {
                            new LessonModel() {Id = 1, Name = "Lesson 1"},
                            new LessonModel() {Id = 2, Name = "Lesson 2"},
                            new LessonModel() {Id = 3, Name = "Lesson 3"}
                        }
            };

            // using (var config = JsConfig.BeginScope())
            // {
            //     config.EmitCamelCaseNames = false;
            //     return new HttpResult(res.ToJson());
            // }

            return res;
        }
    }

    [DataContract]
    public class LessonModel
    {
        [DataMember(Name = "Id")]
        public int Id { get; set; }
        [DataMember(Name = "Name")]
        public string Name { get; set; }

        // This is just to remember how i can mix PascalCase and CamelCase 
        // property name when serializing.
        [DataMember(Name = "dummy")]
        public string Dummy { get; set; }
    }

    public class FilterParametersLessons : FilterParametersBase
    {
        public int TrainingId { get; set; }
    }
}