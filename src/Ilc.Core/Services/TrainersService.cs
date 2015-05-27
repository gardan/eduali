using System;
using System.Collections.Generic;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;

namespace Ilc.Core.Services
{
    public class TrainersService : ITrainersService
    {
        public IUow Uow { get; set; }
        public IUsersService Users { get; set; }
        public IAuthorizationService Authorization { get; set; }

        public FilteredResults<Trainer> GetFiltered(FilterArgumentsTrainers parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;

            var user = Users.GetByEmail();
            var query = Uow.Trainers.GetAll().Where(t => t.CompanyId == user.CompanyId);

            if (!Authorization.HasClaim(SystemClaims.TasksAdministration) && Authorization.HasClaim(SystemClaims.TasksTrainer))
            {
                var userId = Users.GetByEmail().Id;
                query = query.Where(t => t.UserProfileId == userId);
            }

            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

            // filter by relations ids
            if (parameters.SubjectId > 0)
            {
                query = query.Where(t => t.Subjects.Any(s => s.Id == parameters.SubjectId));
            }

            // filter
            foreach (var filter in parameters.Filter)
            {
                var inFilter = filter;
                switch (filter.Field)
                {
                    case "name":
                        query = query.Where(s => s.UserProfile.UserDetails.FirstName.Contains(inFilter.Value) ||
                                                 s.UserProfile.UserDetails.LastName.Contains(inFilter.Value));
                        break;
                    case "subject":
                        // Doru
//                        query = query.Where(t => t.Subjects.First().Name.Contains(inFilter.Value));
                        break;
                    case "phone":
                        query = query.Where(t => t.Phone.Contains(inFilter.Value));
                        break;
                    default:
                        // TODO: Log this!!
                        break;
                }
            }

            // order
            query = query.OrderBy(e => e.Id);

            // paging
            query = query.Skip(parameters.StartIndex).Take(parameters.Length);

            return new FilteredResults<Trainer>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = totalDisplayRecords,
                TotalRecords = totalDisplayRecords
            };
        }

        public Trainer GetByTrainerId(int id)
        {
            return Uow.Trainers.GetById(id);
        }

        public void Create(Trainer newTrainer)
        {
            var loggedInUser = Users.GetByEmail();

            // first create the user.
            var email = newTrainer.UserProfile.Email;
            var userDetails = newTrainer.UserProfile.UserDetails;
            newTrainer.UserProfile = null;
            
            // Creat the user
            var user = Users.GetByEmail();
            var role = Uow.Roles.GetAll().FirstOrDefault(r => r.RoleName == "Trainer" && r.CompanyId == user.CompanyId);
            var newUser = new UserProfile() { CompanyId = loggedInUser.CompanyId, Email = email, UserDetails = userDetails, Roles = new List<Role>() { role } };
            Users.Create(newUser, "", false);

            // Append the userId to the trainer
            newTrainer.UserProfileId = newUser.Id;
            newTrainer.CompanyId = loggedInUser.CompanyId;

            // Create the trainer
            Uow.Trainers.Add(newTrainer);
            Uow.Commit();
        }

        public void Update(Trainer updateTrainer)
        {
            Uow.Trainers.Update(updateTrainer);
            Uow.Commit();
        }

        public void Delete(int id)
        {
            var trainer = Uow.Trainers.GetById(id);

            var trainings = Uow.Trainings.GetAll().Where(t => t.Owners.Any(o => o.Id == trainer.UserProfileId) || t.StakeHolders.Any(sh => sh.Id == trainer.UserProfileId)).ToList();
            foreach (var training in trainings)
            {
                training.Owners.Remove(trainer.UserProfile);
                training.StakeHolders.Remove(trainer.UserProfile);
                Uow.Trainings.Update(training);
            }

            Uow.Commit();

            trainer.Subjects.Clear();
            Uow.Trainers.Delete(trainer);
            Uow.Commit();

            var userId = trainer.UserProfileId;
            Users.Delete(userId);
        }

        public Trainer GetByUserId(int id)
        {
            return Uow.Trainers.GetAll().FirstOrDefault(t => t.UserProfileId == id);
        }
    }
}
