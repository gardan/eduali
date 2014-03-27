using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Misc.Comparer;
using Ilc.Web.Models;
using ServiceStack;

namespace Ilc.Web.Services.Grading
{
    public class AttributesService : Service
    {
        public IUow Uow { get; set; }

        public FilteredDataModel<GradingAttributeModel> Get(FilterParametersAttributes request)
        {
            if (request.TrainingId <= 0) return null;
            IEnumerable<GradingAttribute> assignedAttributes =
                Uow.GradingAttributes.GetAll().Where(a => a.Trainings.Any(t => t.Id == request.TrainingId));

            List<GradingAttributeModel> data;
            if (request.Assigned)
            {
                data = assignedAttributes.Select(a => new GradingAttributeModel() {Id = a.Id, Name = a.Name}).ToList();
            }
            else
            {
                var trainingId = 49;
                var attributes = Uow.Trainings.GetById(trainingId).GradingSystem.Attributes;
                data = attributes.Except<GradingAttribute>(assignedAttributes, new GradingAttributeComparer()).
                    Select(a => new GradingAttributeModel() { Id = a.Id, Name = a.Name }).ToList();
            }


            return new FilteredDataModel<GradingAttributeModel>()
                {
                    Data = data,
                    
                };
        }

        public HttpResult Post(CreateGradingAttributeModel request)
        {
            var attribute = new GradingAttribute()
                {
                    Enabled = true,
                    GradingSystemId = request.GradingSystemId,
                    Name = request.Name
                };
            Uow.GradingAttributes.Add(attribute);
            Uow.Commit();

            return new HttpResult(new GradingAttributeModel() { Id =attribute.Id, Name = attribute.Name})
                {
                    StatusCode = HttpStatusCode.Created,
                    Location = Request.AbsoluteUri.CombineWith(attribute.Id)
                };
        }

        public HttpResult Put(GradingAttributeModel request)
        {
            var attribute = Uow.GradingAttributes.GetById(request.Id);
            attribute.Name = request.Name;

            Uow.GradingAttributes.Update(attribute);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Delete(GradingAttributeModel request)
        {
            Uow.GradingAttributes.Delete(request.Id);
            Uow.Commit();
            
            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class FilterParametersAttributes : FilterArgumentsGradingAttributes
    {

    }

    public class CreateGradingAttributeModel
    {
        public int GradingSystemId { get; set; }
        public string Name { get; set; }
    }
}