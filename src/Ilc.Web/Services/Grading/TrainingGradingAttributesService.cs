using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Data.Contracts;
using ServiceStack;

namespace Ilc.Web.Services.Grading
{
    public class TrainingGradingAttributesService : Service
    {
        public IUow Uow { get; set; }

        public HttpResult Delete(TrainingGradingAttributeDeleteModel request)
        {
            var attribute = Uow.GradingAttributes.GetById(request.GradingAttributeId);

            var training = attribute.Trainings.FirstOrDefault(t => t.Id == request.TrainingId);

            attribute.Trainings.Remove(training);

            Uow.GradingAttributes.Update(attribute);
            Uow.Commit();
            
            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class TrainingGradingAttributeDeleteModel
    {
        public int TrainingId { get; set; }
        public int GradingAttributeId { get; set; }
    }
}