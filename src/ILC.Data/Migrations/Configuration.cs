using System.Data;
using System.Data.Entity.Infrastructure;
using Ilc.Data;
using Ilc.Data.Models;

namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    public class Configuration : DbMigrationsConfiguration<AppContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(AppContext context)
        {
            context.Subjects.AddOrUpdate(s => s.Name, 
                new Subject() {Name = "English"},
                new Subject() {Name = "Romanian"});

            SeedInitialAccount(context);
            SeedEvaluationQuestions(context);
        }

        private void SeedEvaluationQuestions(AppContext context)
        {
            context.RadioPossibleAnswers.AddOrUpdate(a => a.Text,
                new RadioPossibleAnswer() { Text = "Answer1" },
                new RadioPossibleAnswer() { Text = "Answer2" },
                new RadioPossibleAnswer() { Text = "Answer3" });

            context.SaveChanges();

            context.TrainingEvaluationQuestions.AddOrUpdate(q => q.Text,
                new TrainingEvaluationQuestion() { Text = "One answer question?", Type = "string" },
                new TrainingEvaluationQuestion() { Text = "RadioGroup question?", Type = "radiogroup", Answers = context.RadioPossibleAnswers.ToList() },
                new TrainingEvaluationQuestion() { Text = "Checkbox question?", Type = "checkbox" });

            context.SaveChanges();
        }

        protected void SeedInitialAccount(AppContext context)
        {
            var user = context.UserProfiles.FirstOrDefault(u => u.Username == "admin");
            if (user != null) // user exists
            {
                // check if membership exists
                var membership = context.Membership.Find(user.Id);
                if (membership == null) // membership does not exist
                {
                    // Delete the user profile
                    DbEntityEntry dbEntityEntry = context.Entry(user);
                    if (dbEntityEntry.State != EntityState.Deleted)
                    {
                        dbEntityEntry.State = EntityState.Deleted;
                    }
                    else
                    {
                        context.UserProfiles.Attach(user);
                        context.UserProfiles.Remove(user);
                    }
                }
                else
                {
                    return;
                }
            }

            // create the user profile
            var firstUser = new UserProfile() {Username = "admin"};
            context.UserProfiles.Add(firstUser);
            context.SaveChanges();

            // create the membership
            var pwd = "admin";
            var salt = Crypto.Crypto.GenerateSalt();
            var hashedPwd = Crypto.Crypto.Hash(salt + Crypto.Crypto.Hash(salt + pwd));

            var firstMembership = new Models.SimpleMembership.Membership()
                {
                    UserId = firstUser.Id,
                    PasswordFailuresSinceLastSuccess = 0,
                    Password = hashedPwd,
                    PasswordSalt = salt
                };
            context.Membership.Add(firstMembership);
            

            
        }
    }
}
