using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Data.Contracts;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class TrainingContactsService : Service
    {
        public IUow Uow { get; set; }

        public HttpResult Post(PostTrainingContactsModel request)
        {
            if (!request.Ids.Contains(request.Id))
            {
                request.Ids.Add(request.Id);
            }

            var training = Uow.Trainings.GetById(request.TrainingId);

            foreach (var id in request.Ids)
            {
                var contactToAdd = Uow.Contacts.GetById(id);

                if (training.ContactPersons.Contains(contactToAdd))
                {
                    continue;
                }

                training.ContactPersons.Add(contactToAdd);    
            }

            Uow.Trainings.Update(training);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class PostTrainingContactsModel
    {
        public PostTrainingContactsModel()
        {
            Ids = new List<int>();
        }

        public int TrainingId { get; set; }
        public int Id { get; set; }
        public List<int> Ids { get; set; }
    }
}