using System.Linq;
using System.Net;
using Ilc.Core.Exceptions;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class RoleAssignmentsService : Service
    {

        public IUow Uow { get; set; }

        

        public HttpResult Post(RoleAssignmentModel request)
        {
            var role = Uow.Roles.GetById(request.RoleId);
            var user = Uow.UserProfiles.GetById(request.UserId);

            if (this.IsTrainerRole(role))
            {
                this.AddUserToTrainer(user);
            }

            role.UserProfiles.ToList();

            role.UserProfiles.Add(user);

            Uow.Roles.Update(role);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        private void AddUserToTrainer(UserProfile user)
        {
            // is this user already in the trainers table?
            if (Uow.Trainers.GetAll().FirstOrDefault(t => t.UserProfileId == user.Id) != null)
            {
                return;
            }

            var trainer = new Trainer()
                {
                    UserProfileId = user.Id,
                    CompanyId = user.CompanyId
                };
            Uow.Trainers.Add(trainer);
            Uow.Commit();
        }

        private bool IsTrainerRole(Role role)
        {
            return (role.RoleName == "Trainer" && !role.CanDelete);
        }

        public HttpResult Delete(RoleAssignmentModel request)
        {
            var role = Uow.Roles.GetById(request.RoleId);
            var user = Uow.UserProfiles.GetById(request.UserId);

            if (this.IsTrainerRole(role))
            {
                if (this.TrainerHasLessons(user))
                {
                    throw new NotAllowedException("This Trainer has lessons assigned to him. Can't remove from Trainers.");
                }
                this.RemoveUserFromTrainer(user);
            }

            user.Roles.ToList();

            user.Roles.Remove(role);
            Uow.UserProfiles.Update(user);

            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        private void RemoveUserFromTrainer(UserProfile user)
        {
                
        }

        private bool TrainerHasLessons(UserProfile user)
        {
            return user.TrainingTasks.Count > 0;
        }
    }

    public class RoleAssignmentModel
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }    
    }
}