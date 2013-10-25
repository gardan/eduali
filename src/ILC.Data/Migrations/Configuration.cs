using System.Collections.Generic;
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
                new Subject() { Name = "English" },
                new Subject() { Name = "Romanian" });

            SeedInitialAccount(context);
            SeedEvaluationQuestions(context);
            SeedCustomer(context);
            SeenStudents(context);
            SeedSubjects(context);
            SeedTrainer(context);
        }

        private void SeedSubjects(AppContext context)
        {
            context.Subjects.AddOrUpdate(s => s.Name,
                new Subject() { Name = "Romanian" },
                new Subject() { Name = "English" });

            context.SaveChanges();
        }

        private void SeedTrainer(AppContext context)
        {
            var subjects = context.Subjects.ToList();
            var user = new UserProfile() {Username = "alex"};
            AddUser(context, user);

            context.Trainers.AddOrUpdate(t => t.Name,
                new Trainer()
                    {
                        Address = "Str. Orsova, Nr. 26",
                        Name = "Alecsandru Tache",
                        Phone = "alecs@mail.com",
                        Subjects = subjects,
                        UserProfileId = user.Id
                    });
            context.SaveChanges();
        }

        private void SeenStudents(AppContext context)
        {
            var customerId = context.Customers.FirstOrDefault().Id;
            context.Students.AddOrUpdate(s => s.Name,
                new Student()
                    {
                        Name = "Ionel Popescu",
                        CustomerId = customerId,
                    },
                new Student()
                    {
                        Name = "Ghita Alexandru",
                        CustomerId = customerId
                    });
        }

        private void SeedCustomer(AppContext context)
        {
            context.Customers.AddOrUpdate(c => c.Name,
                new Customer()
                    {
                        BankAccount = "IBAN0912749126972",
                        Name = "Ilc",
                        BillingAddress = "Str. Whatever",
                        ContactPersons = new List<ContactPerson>()
                            {
                                new ContactPerson()
                                    {
                                        Email = "ilc@ilc.com",
                                        IsMain = true,
                                        Name = "George Adams"
                                    }
                            }
                    });
            context.SaveChanges();
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
            var firstUser = new UserProfile() { Username = "admin" };
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

        private void AddUser(AppContext context, UserProfile user)
        {
            context.UserProfiles.Add(user);
            context.SaveChanges();

            // create the membership
            var pwd = user.Username;
            var salt = Crypto.Crypto.GenerateSalt();
            var hashedPwd = Crypto.Crypto.Hash(salt + Crypto.Crypto.Hash(salt + pwd));

            var firstMembership = new Models.SimpleMembership.Membership()
            {
                UserId = user.Id,
                PasswordFailuresSinceLastSuccess = 0,
                Password = hashedPwd,
                PasswordSalt = salt
            };
            context.Membership.Add(firstMembership);
        }
    }
}
