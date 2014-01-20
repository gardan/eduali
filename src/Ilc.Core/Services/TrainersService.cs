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

            var query = Uow.Trainers.GetAll();

            if (Authorization.HasClaim(SystemClaims.TasksTrainer))
            {
                var userId = Users.GetByUsername().Id;
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
            // first create the user.
            var username = newTrainer.UserProfile.UserDetails.FirstName.Trim().Split(Convert.ToChar(" "))[0].ToLower();
            var userDetails = newTrainer.UserProfile.UserDetails;
            newTrainer.UserProfile = null;
            var originalUsername = username;
            // check to see if the username exists
            var index = 0;
            UserProfile user;
            var usernameFound = true;
            do
            {
                user = Uow.UserProfiles.GetAll().FirstOrDefault(u => u.Username == username);
                
                if (user != null)
                {
                    username = originalUsername + "_" + index++;
                    usernameFound = false;
                }
                else
                {
                    usernameFound = true;
                }
            } while (!usernameFound);

            // Creat the user
            var role = Uow.Roles.GetAll().FirstOrDefault(r => r.RoleName == "Trainer");
            var newUser = new UserProfile() {Username = username, UserDetails = userDetails, Roles = new List<Role>() { role }};
            Users.Create(newUser, username);

            // Append the userId to the trainer
            newTrainer.UserProfileId = newUser.Id;

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
            Uow.Trainers.Delete(id);
            Uow.Commit();
        }

        public Trainer GetByUserId(int id)
        {
            return Uow.Trainers.GetAll().FirstOrDefault(t => t.UserProfileId == id);
        }
    }
}
