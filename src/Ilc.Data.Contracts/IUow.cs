﻿using System;
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
        IMembershipRepository Memberships { get; }
        IRepository<Assesment> Assesments { get; }
        IRepository<TrainingOwnersConfiguration> TrainingOwnersConfiguration { get; }
        IRepository<Subject> Subjects { get; }
        IRepository<StatusDictionary> StatusDictionary { get; }
        IRepository<GradingSystem> GradingSystems { get; }
        IRepository<Grade> Grades { get; }
        IRepository<ContactPerson> Contacts { get; }
        IRepository<Spendings> Spendings { get; } 
        IRepository<TrainingEvaluationQuestion> Questions { get; }
        IRepository<Availability> Availabilities { get; }
        IRepository<Template> Templates { get; }
        IRepository<TemplateDay> TemplateDays { get; }
        IRepository<Company> Companies { get; }
        IRepository<SubjectFile> SubjectFiles { get; }
        IRepository<GradingAttribute> GradingAttributes { get; }
        IRepository<CustomerLog> CustomerLogs { get; }
        IRepository<FileTemplate> FileTemplates { get; }
        IRepository<Expense> Expenses { get; } 
        IRepository<ExpenseType> ExpenseTypes { get; }
        IRepository<Offer> DecoupledOffers { get; }

        IRepository<RoleClaim> RoleClaims { get; }


        IRepository<T> GetStandardRepo<T>() where T : class;
    }
}
