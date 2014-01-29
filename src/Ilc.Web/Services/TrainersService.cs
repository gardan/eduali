using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Data.Models;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;

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
            var userInfo = new UserDetails().InjectFrom(request.UserInfo) as UserDetails;
            newTrainer.UserProfile = new UserProfile() { UserDetails = userInfo };

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
            var updatedTrainer = Trainers.GetByTrainerId(request.Id);
            updatedTrainer.UserProfile.UserDetails.FirstName = request.UserInfo.FirstName;
            updatedTrainer.UserProfile.UserDetails.LastName = request.UserInfo.LastName;
            updatedTrainer.UserProfile.UserDetails.Email = request.UserInfo.Email;
            updatedTrainer.UserProfile.UserDetails.Phone = request.UserInfo.Phone;

            Trainers.Update(updatedTrainer);
            
            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Delete(DeleteTrainerModel request)
        {
            Trainers.Delete(request.Id);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }
}