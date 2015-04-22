using System.Collections.Generic;
using System.Linq;
using System.Net;
using Ilc.Core.Contracts;
using Ilc.Core.Exceptions;
using Ilc.Data.Models;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class TrainersService : Service
    {

        public ITrainersService Trainers { get; set; }
        public ISubjectsService Subjects { get; set; }

        public FilteredDataModel<TrainerModel> Get(FilterParametersTrainers request)
        {
            var results = Trainers.GetFiltered(request);

            return new FilteredDataModel<TrainerModel>()
                {
                    Data = results.Data.Select(t => new TrainerModel().InjectFrom<TrainerToTrainerModel>(t) as TrainerModel).ToList(),
                    TotalRecords = results.TotalRecords,
                    TotalDisplayRecords = results.TotalDisplayRecords
                };
        }

        public HttpResult Post(CreateTrainerModel request)
        {
            var newTrainer = new Trainer().InjectFrom(request) as Trainer;
            var userInfo = new UserDetails().InjectFrom<UserInfoModelToUserDetails>(request.UserInfo) as UserDetails;
            newTrainer.UserProfile = new UserProfile() { Email = request.UserInfo.Email, UserDetails = userInfo };

            Trainers.Create(newTrainer);
            newTrainer.Subjects = new List<Subject>();

            foreach (var subjectModel in request.Subjects)
            {
                newTrainer.Subjects.Add(Subjects.GetById(subjectModel.Id));
            }

            Trainers.Update(newTrainer);

            var transferObject = new TrainerModel().InjectFrom<TrainerToTrainerModel>(newTrainer);
            return new HttpResult(transferObject)
                {
                    StatusCode = HttpStatusCode.Created,
                    Location = Request.AbsoluteUri.CombineWith(newTrainer.Id)
                };
        }

        public HttpResult Put(EditTrainerModel request)
        {
            var userDetails = new UserDetails().InjectFrom<UserInfoModelToUserDetails>(request.UserInfo) as UserDetails;
            var updatedTrainer = Trainers.GetByTrainerId(request.Id);
            updatedTrainer.UserProfile.Email = request.UserInfo.Email;
            updatedTrainer.UserProfile.UserDetails.PopulateWithNonDefaultValues(userDetails);

            Trainers.Update(updatedTrainer);
            
            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Delete(DeleteTrainerModel request)
        {
            if (this.TrainerHasLessons(request.Id))
            {
                throw new NotAllowedException("This Trainer has lessons assigned to him. Can't remove from Trainers.");
            }

            Trainers.Delete(request.Id);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        private bool TrainerHasLessons(int trainerId)
        {
            var trainer = Trainers.GetByTrainerId(trainerId);

            return trainer.UserProfile.TrainingTasks.Count > 0;
        }
    }
}