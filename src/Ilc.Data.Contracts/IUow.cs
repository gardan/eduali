using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;
using Ilc.Data.Models.WebClient;

namespace Ilc.Data.Contracts
{
    public interface IUow
    {
        // Save pending changes to the data store
        void Commit();

        // Repositories
        IUserProfileRepository UserProfiles { get; }
        IRepository<RoleClaim> Claims { get; }
        IRolesRepository Roles { get; }
        IRepository<Training> Trainings { get; }
        IRepository<Student> Students { get; }
        IRepository<Customer> Customers { get; }
        IRepository<Trainer> Trainers { get; }
        IRepository<GridConfig> GridConfigs { get; }
        IRepository<TrainingOffer> Offers { get; }
        IRepository<InterviewPlan> InterviewPlans { get; }
        IRepository<StudentInterview> Interviews { get; }
        IRepository<TrainingScheduleDay> TrainingScheduleDays { get; }
        IRepository<ProgressEvaluation> ProgressEvaluations { get; }
        IRepository<TrainingEvaluation> TrainingEvaluations { get; }
        IRepository<Membership> Memberships { get; } 
    }
}
