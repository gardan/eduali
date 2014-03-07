using System.Linq;
using System.Net;
using Ilc.Core.Contracts;
using ServiceStack;

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

        public HttpResult Delete(TrainerSubjectModel request)
        {
            // Delete subjects from trainer

            var trainer = Trainers.GetByTrainerId(request.TrainerId);
            var justLoadIt = trainer.Subjects.ToList();

            foreach (var subject in justLoadIt)
            {
                if (subject.Id == request.SubjectId)
                {
                    trainer.Subjects.Remove(subject);
                    Trainers.Update(trainer);
                    break;
                }
            }

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class TrainerSubjectModel
    {
        public int TrainerId { get; set; }
        public int SubjectId { get; set; }
    }

    public class CreateTrainersSubjectModel
    {
        public int TrainerId { get; set; }
        public SubjectModel[] Subjects { get; set; }
    }
}