using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration.Conventions;
using Ilc.Data.Configuration;
using Ilc.Data.Configuration.SimpleMembership;
using Ilc.Data.Helpers;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;
using Ilc.Data.Models.WebClient;

namespace Ilc.Data
{
    public class AppContext : DbContext
    {
        public AppContext()
            : base("AppConnection")
        {
            (this as IObjectContextAdapter).ObjectContext.ContextOptions.UseCSharpNullComparisonBehavior = true;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Convetions
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();

            // Fluent configurations
            modelBuilder.Configurations.Add(new UserProfileConfiguration());
            modelBuilder.Configurations.Add(new ClaimsConfiguration());

            // WebSecurity Configurations
            modelBuilder.Configurations.Add(new MembershipConfiguration());
            // modelBuilder.Configurations.Add(new OAuthMembershipConfiguration());
            modelBuilder.Configurations.Add(new RolesConfiguration());

        }

        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<RoleClaim> Claims { get; set; }
        public DbSet<Training> Trainings { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Student> Students { get; set; } 
        public DbSet<Trainer> Trainers { get; set; }
        public DbSet<TrainingOffer> Offers { get; set; }
        public DbSet<InterviewPlan> InterviewPlans { get; set; }
        public DbSet<TrainingEvaluation> TrainingEvaluations { get; set; }
        public DbSet<StatusDictionary> StatusDictionaries { get; set; }
        public DbSet<GradingSystem> GradingSystems { get; set; }
        public DbSet<Availability> Availabilities { get; set; }

        public DbSet<TrainingEvaluationQuestion> TrainingEvaluationQuestions { get; set; }
        public DbSet<RadioPossibleAnswer> RadioPossibleAnswers { get; set; }

        public DbSet<GridConfig> GridConfigs { get; set; }

        public DbSet<Role> Roles { get; set; }
        public DbSet<Membership> Membership { get; set; }
        // public DbSet<OAuthMembership> OAuthMembership { get; set; }
    }
}
