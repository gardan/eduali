using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class TrainersSubjectsService : Service
    {
        public ITrainersService Trainers { get; set; }
        public ISubjectsService Subjects { get; set; }

        public HttpResult Post(CreateTrainersSubjectModel request)
        {
            // AddSubjectsToTrainer
            var trainer = Trainers.GetByTrainerId(request.TrainerId);
            var justLoadIt = trainer.Subjects.ToList();

            foreach (var subjectModel in request.Subjects)
            {
                trainer.Subjects.Add(Subjects.GetById(subjectModel.Id));
            }

            Trainers.Update(trainer);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class CreateTrainersSubjectModel
    {
        public int TrainerId { get; set; }
        public SubjectModel[] Subjects { get; set; }
    }
}