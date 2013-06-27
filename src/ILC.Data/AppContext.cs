using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration.Conventions;
using Ilc.Data.Configuration;
using Ilc.Data.Configuration.SimpleMembership;
using Ilc.Data.Helpers;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;

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
            modelBuilder.Configurations.Add(new CompanyConfiguration());
            // modelBuilder.Configurations.Add(new DepartmentConfiguration());
            modelBuilder.Configurations.Add(new EmployeeConfiguration());
            modelBuilder.Configurations.Add(new UserProfileConfiguration());
            modelBuilder.Configurations.Add(new ClaimsConfiguration());
            modelBuilder.Configurations.Add(new WorkspaceViewConfiguration());
            modelBuilder.Configurations.Add(new UserProfileWorkspaceViewConfiguration());

            // WebSecurity Configurations
            modelBuilder.Configurations.Add(new MembershipConfiguration());
            // modelBuilder.Configurations.Add(new OAuthMembershipConfiguration());
            modelBuilder.Configurations.Add(new RolesConfiguration());

        }

        public DbSet<Company> Companies { get; set; }
        // public DbSet<Department> Departments { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Employee> Employees { get; set; }
        // public DbSet<LeaveRequest> LeaveRequests { get; set; }
        public DbSet<RoleClaim> Claims { get; set; }
        // public DbSet<EmailAccount> EmailAccounts { get; set; }
        public DbSet<WorkspaceView> WorkspaceViews { get; set; }
        public DbSet<UserProfileWorkspaceView> UserProfileWorkspaceViews { get; set; }
        // public DbSet<WorkingDay> WorkingDays { get; set; }
        // public DbSet<Shift> Shifts { get; set; }
        // public DbSet<ShiftPattern> ShiftPattern { get; set; }
        // public DbSet<DayPattern> DayPatterns { get; set; }
        // public DbSet<TimeRecord> TimeRecords { get; set; }

        public DbSet<Role> Roles { get; set; }
        public DbSet<Membership> Membership { get; set; }
        // public DbSet<OAuthMembership> OAuthMembership { get; set; }
    }
}
