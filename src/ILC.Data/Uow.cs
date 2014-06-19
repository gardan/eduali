using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Data.Helpers;
using Ilc.Data.Models.SimpleMembership;
using Ilc.Data.Models.WebClient;

namespace Ilc.Data
{
    public class Uow : IUow, IDisposable
    {
        private AppContext DbContext { get; set; }

        protected IRepositoryProvider RepositoryProvider { get; set; }

        // Repositories 
        public IUserProfileRepository UserProfiles { get { return GetRepo<IUserProfileRepository>(); } }
        public IRepository<RoleClaim> Claims { get { return GetStandardRepo<RoleClaim>(); } }
        public IRolesRepository Roles { get { return GetRepo<IRolesRepository>(); } }
        public IRepository<Training> Trainings { get { return GetStandardRepo<Training>(); } }
        public IRepository<Customer> Customers { get { return GetStandardRepo<Customer>(); } }
        public IRepository<Student> Students { get { return GetStandardRepo<Student>(); } }
        public IRepository<Trainer> Trainers { get { return GetStandardRepo<Trainer>(); } }
        public IRepository<GridConfig> GridConfigs { get { return GetStandardRepo<GridConfig>(); } }
        public IRepository<TrainingOffer> Offers { get { return GetStandardRepo<TrainingOffer>(); } }
        public IRepository<InterviewPlan> InterviewPlans { get { return GetStandardRepo<InterviewPlan>(); } }
        public IRepository<StudentInterview> Interviews { get { return GetStandardRepo<StudentInterview>(); } }
        public IRepository<TrainingScheduleDay> TrainingScheduleDays { get { return GetStandardRepo<TrainingScheduleDay>(); } }
        public IRepository<ProgressEvaluation> ProgressEvaluations { get { return GetStandardRepo<ProgressEvaluation>(); } }
        public IRepository<TrainingEvaluation> TrainingEvaluations { get { return GetStandardRepo<TrainingEvaluation>(); } }
        public IMembershipRepository Memberships { get { return GetRepo<IMembershipRepository>(); } }
        public IRepository<Assesment> Assesments { get { return GetStandardRepo<Assesment>(); } }
        public IRepository<TrainingOwnersConfiguration> TrainingOwnersConfiguration { get { return GetStandardRepo<TrainingOwnersConfiguration>(); } }
        public IRepository<Subject> Subjects { get { return GetStandardRepo<Subject>(); } }
        public IRepository<StatusDictionary> StatusDictionary { get { return GetStandardRepo<StatusDictionary>(); } }
        public IRepository<GradingSystem> GradingSystems { get { return GetStandardRepo<GradingSystem>(); } }
        public IRepository<Grade> Grades { get { return GetStandardRepo<Grade>(); } }
        public IRepository<ContactPerson> Contacts { get { return GetStandardRepo<ContactPerson>(); } }
        public IRepository<Spendings> Spendings { get { return GetStandardRepo<Spendings>(); } }
        public IRepository<TrainingEvaluationQuestion> Questions { get { return GetStandardRepo<TrainingEvaluationQuestion>(); } }
        public IRepository<Availability> Availabilities { get { return GetStandardRepo<Availability>(); } }
        public IRepository<Template> Templates { get { return GetStandardRepo<Template>(); } }
        public IRepository<TemplateDay> TemplateDays { get { return GetStandardRepo<TemplateDay>(); } }
        public IRepository<Company> Companies { get { return GetStandardRepo<Company>(); } }
        public IRepository<SubjectFile> SubjectFiles { get { return GetStandardRepo<SubjectFile>(); } }
        public IRepository<GradingAttribute> GradingAttributes { get { return GetStandardRepo<GradingAttribute>(); } }
        public IRepository<CustomerLog> CustomerLogs { get { return GetStandardRepo<CustomerLog>(); } }
        public IRepository<FileTemplate> FileTemplates { get { return GetStandardRepo<FileTemplate>(); } }
        public IRepository<Expense> Expenses { get { return GetStandardRepo<Expense>(); } }
        public IRepository<ExpenseType> ExpenseTypes { get { return GetStandardRepo<ExpenseType>(); } }
        public IRepository<RoleClaim> RoleClaims { get { return GetStandardRepo<RoleClaim>(); } }
        

        public Uow(IRepositoryProvider repositoryProvider)
        {
            CreateDbContext();

            repositoryProvider.DbContext = DbContext;
            RepositoryProvider = repositoryProvider;
        }

        public void Commit()
        {
            DbContext.SaveChanges();
        }

        protected void CreateDbContext()
        {
            DbContext = new AppContext();

            // Load navigation properties explicitly
            // DbContext.Configuration.LazyLoadingEnabled = false;

            // Because Web API will perform validation, we don't need/want EF to do so
            // DbContext.Configuration.ValidateOnSaveEnabled = false;

            //DbContext.Configuration.AutoDetectChangesEnabled = false;
            // We won't use this performance tweak because we don't need 
            // the extra performance and, when autodetect is false,
            // we'd have to be careful. We're not being that careful FOR NOW.
        }

        private IRepository<T> GetStandardRepo<T>() where T : class
        {
            return RepositoryProvider.GetRepositoryForEntityType<T>();
        }

        private T GetRepo<T>() where T : class
        {
            return RepositoryProvider.GetRepository<T>();
        }

        #region IDisposable
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (DbContext != null)
                {
                    DbContext.Dispose();
                }
            }
        }
        #endregion
    }
}
