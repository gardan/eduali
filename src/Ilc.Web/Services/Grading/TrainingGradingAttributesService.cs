using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
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

        public HttpResult Post(TrainingGradingAttributeCreateModel request)
        {
            var training = Uow.Trainings.GetById(request.TrainingId);
            var attributes = new List<GradingAttribute>();
            attributes.AddRange(request.GradingAttributes.Select(gradingAttributeModel => Uow.GradingAttributes.GetById(gradingAttributeModel.Id)));

            foreach (var gradingAttribute in attributes)
            {
                training.GradingAttributes.Add(gradingAttribute);
            }

            Uow.Trainings.Update(training);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class TrainingGradingAttributeCreateModel
    {
        public int TrainingId { get; set; }
        public GradingAttributeModel[] GradingAttributes { get; set; }

    }

    public class TrainingGradingAttributeDeleteModel
    {
        public int TrainingId { get; set; }
        public int GradingAttributeId { get; set; }
    }
}