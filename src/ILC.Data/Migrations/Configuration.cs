using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Infrastructure;
using Ilc.Data;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;

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
            SeedInitialCompany(context);
            SeedGradingSystems(context);
            SeedRoles(context);
            SeedInitialAccount(context);
            SeedEvaluationQuestions(context);
            SeedCustomer(context);
            SeedStudents(context);
            SeedSubjects(context);
            SeedTrainer(context);
            SeedStatusDictionary(context);
            SeedTemplates(context);
        }

        private void SeedInitialCompany(AppContext context)
        {
            context.Companies.AddOrUpdate(c => c.Name, 
                new Company() {Name = "Edu Alliance"});

            context.SaveChanges();
        }

        private void SeedTemplates(AppContext context)
        {
            var admin = context.UserProfiles.Find(1);

            context.Templates.AddOrUpdate(t => t.Name,
                new Template()
                {
                    CompanyId = 1,
                    Name = "Morning",
                    CreateDate = DateTimeOffset.UtcNow,
                    Creator = admin,
                    TemplateDays = new List<TemplateDay>()
                            {
                                new TemplateDay() { StartDate = new DateTimeOffset(1, 1, 1, 8, 0, 0, 0, TimeSpan.Zero ), EndDate = new DateTimeOffset(1, 1, 1, 16, 0, 0, 0, TimeSpan.Zero ) },
                                new TemplateDay() { StartDate = new DateTimeOffset(1, 1, 1, 8, 0, 0, 0, TimeSpan.Zero ), EndDate = new DateTimeOffset(1, 1, 1, 16, 0, 0, 0, TimeSpan.Zero ) },
                                new TemplateDay() { StartDate = new DateTimeOffset(1, 1, 1, 8, 0, 0, 0, TimeSpan.Zero ), EndDate = new DateTimeOffset(1, 1, 1, 16, 0, 0, 0, TimeSpan.Zero ) },
                                new TemplateDay() { StartDate = new DateTimeOffset(1, 1, 1, 8, 0, 0, 0, TimeSpan.Zero ), EndDate = new DateTimeOffset(1, 1, 1, 16, 0, 0, 0, TimeSpan.Zero ) },
                                new TemplateDay() { StartDate = new DateTimeOffset(1, 1, 1, 8, 0, 0, 0, TimeSpan.Zero ), EndDate = new DateTimeOffset(1, 1, 1, 16, 0, 0, 0, TimeSpan.Zero ) },
                                new TemplateDay() { OffDay = true },
                                new TemplateDay() { OffDay = true }
                            }
                },
                new Template()
                {
                    CompanyId = 1,
                    Name = "Afternoon",
                    CreateDate = DateTimeOffset.UtcNow,
                    Creator = admin,
                    TemplateDays = new List<TemplateDay>()
                           {
                               new TemplateDay() { StartDate = new DateTimeOffset(1, 1, 1, 16, 0, 0, 0, TimeSpan.Zero ), EndDate = new DateTimeOffset(1, 1, 1, 0, 0, 0, 0, TimeSpan.Zero ) },
                               new TemplateDay() { StartDate = new DateTimeOffset(1, 1, 1, 16, 0, 0, 0, TimeSpan.Zero ), EndDate = new DateTimeOffset(1, 1, 1, 0, 0, 0, 0, TimeSpan.Zero ) },
                               new TemplateDay() { StartDate = new DateTimeOffset(1, 1, 1, 16, 0, 0, 0, TimeSpan.Zero ), EndDate = new DateTimeOffset(1, 1, 1, 0, 0, 0, 0, TimeSpan.Zero ) },
                               new TemplateDay() { StartDate = new DateTimeOffset(1, 1, 1, 16, 0, 0, 0, TimeSpan.Zero ), EndDate = new DateTimeOffset(1, 1, 1, 0, 0, 0, 0, TimeSpan.Zero ) },
                               new TemplateDay() { StartDate = new DateTimeOffset(1, 1, 1, 16, 0, 0, 0, TimeSpan.Zero ), EndDate = new DateTimeOffset(1, 1, 1, 0, 0, 0, 0, TimeSpan.Zero ) },
                               new TemplateDay() { OffDay = true },
                               new TemplateDay() { OffDay = true }
                           }
                },
                new Template()
                {
                    CompanyId = 1,
                    Name = "Night",
                    CreateDate = DateTimeOffset.UtcNow,
                    Creator = admin,
                    TemplateDays = new List<TemplateDay>()
                           {
                               new TemplateDay() { StartDate = new DateTimeOffset(1, 1, 1, 0, 0, 0, 0, TimeSpan.Zero ), EndDate = new DateTimeOffset(1, 1, 1, 8, 0, 0, 0, TimeSpan.Zero ) },
                               new TemplateDay() { StartDate = new DateTimeOffset(1, 1, 1, 0, 0, 0, 0, TimeSpan.Zero ), EndDate = new DateTimeOffset(1, 1, 1, 8, 0, 0, 0, TimeSpan.Zero ) },
                               new TemplateDay() { StartDate = new DateTimeOffset(1, 1, 1, 0, 0, 0, 0, TimeSpan.Zero ), EndDate = new DateTimeOffset(1, 1, 1, 8, 0, 0, 0, TimeSpan.Zero ) },
                               new TemplateDay() { StartDate = new DateTimeOffset(1, 1, 1, 0, 0, 0, 0, TimeSpan.Zero ), EndDate = new DateTimeOffset(1, 1, 1, 8, 0, 0, 0, TimeSpan.Zero ) },
                               new TemplateDay() { StartDate = new DateTimeOffset(1, 1, 1, 0, 0, 0, 0, TimeSpan.Zero ), EndDate = new DateTimeOffset(1, 1, 1, 8, 0, 0, 0, TimeSpan.Zero ) },
                               new TemplateDay() { OffDay = true },
                               new TemplateDay() { OffDay = true }
                           }
                });
        }

        private void SeedGradingSystems(AppContext context)
        {
            context.GradingSystems.AddOrUpdate(s => new { s.Name, s.CompanyId },
                new GradingSystem()
                    {
                        CompanyId = 1,
                        Name = "European",
                        Grades = new List<Grade>()
                            {
                                new Grade() { Name = "A1", Order = 1 },
                                new Grade() { Name = "A2", Order = 2 },
                                new Grade() { Name = "B1", Order = 3 },
                                new Grade() { Name = "B1", Order = 4 },
                                new Grade() { Name = "C1", Order = 5 },
                                new Grade() { Name = "C1", Order = 6 }
                            }
                    },
                new GradingSystem()
                    {
                        CompanyId = 1,
                        Name = "Romanian",
                        Grades = new List<Grade>()
                            {
                                new Grade() { Name = "10", Order = 1 },
                                new Grade() { Name = "9", Order = 2 },
                                new Grade() { Name = "8", Order = 3 },
                                new Grade() { Name = "7", Order = 4 },
                                new Grade() { Name = "6", Order = 5 },
                                new Grade() { Name = "5", Order = 6 },
                                new Grade() { Name = "4", Order = 7 },
                                new Grade() { Name = "3", Order = 8 },
                                new Grade() { Name = "2", Order = 9 },
                                new Grade() { Name = "1", Order = 10 }
                            }
                    });

            context.SaveChanges();
        }

        private void SeedRoles(AppContext context)
        {

            context.Roles.AddOrUpdate(r => new { r.RoleName, r.CompanyId },
                                      new Role()
                                          {
                                              CompanyId = 1,
                                              CanDelete = false,
                                              RoleName = "Customer Contact",
                                              Claims = new List<RoleClaim>()
                                                  {
                                                      new RoleClaim() {Name = "common-main-customer-contact", Value = true.ToString()}
                                                  }
                                          },
                                      new Role()
                                          {
                                              CompanyId = 1,
                                              CanDelete = false,
                                              RoleName = "Customer Supervizor",
                                              Claims = new List<RoleClaim>()
                                                  {
                                                      new RoleClaim() {Name = "common-customer-training-contact", Value = true.ToString()}
                                                  }
                                          },
                                      new Role() // Student
                                          {
                                              CompanyId = 1,
                                              CanDelete = false,
                                              RoleName = "Student",
                                              Claims = new List<RoleClaim>()
                                                  {
                                                      new RoleClaim() {Name = "tasks-student", Value = true.ToString()}
                                                  }
                                          },
                                      new Role() // Trainer
                                          {
                                              CompanyId = 1,
                                              CanDelete = false,
                                              RoleName = "Trainer",
                                              Claims = new List<RoleClaim>()
                                                  {
                                                      new RoleClaim() {Name = "tasks-trainer", Value = true.ToString()}
                                                  }
                                          },
                                      new Role() // Zeus
                                          {
                                              CompanyId = 1,
                                              CanDelete = false,
                                              RoleName = "Zeus",
                                              Claims = new List<RoleClaim>()
                                                  {
                                                      new RoleClaim() {Name = "tasks-administrator", Value = true.ToString()},
                                                      new RoleClaim() {Name = "tasks-sales", Value = true.ToString()},
                                                      new RoleClaim() {Name = "tasks-coordinator", Value = true.ToString()},
                                                      new RoleClaim() {Name = "ui-settings-read", Value = true.ToString()},
                                                      new RoleClaim() {Name = "company-read-all", Value = true.ToString()},
                                                  }
                                          }
                                      );
            context.SaveChanges();
        }

        private void SeedStatusDictionary(AppContext context)
        {
            var arr = new[] { "Rfi", "PlanInterview", "Interview", "Offer", "Accepted", "Rejected", "Planned", 
                              "ProgressEvaluation", "Exam", "TrainingEvaluation", "Ended", "Complete" };
            foreach (var status in arr)
            {
                var record = context.StatusDictionaries.FirstOrDefault(r => r.Name == status);
                if (record == null)
                {
                    context.StatusDictionaries.AddOrUpdate(s => s.Name,
                    new StatusDictionary() { CompanyId = 1, Name = status, FriendlyName = status });
                }
            }
            context.SaveChanges();
        }

        private void SeedSubjects(AppContext context)
        {
            context.Subjects.AddOrUpdate(s => s.Name,
                new Subject() { Name = "Romanian", CompanyId = 1 },
                new Subject() { Name = "English", CompanyId = 1 });

            context.SaveChanges();
        }

        private void SeedTrainer(AppContext context)
        {
            var subjects = context.Subjects.ToList();
            var user = new UserProfile()
            {
                CompanyId = 1,
                Username = "alex",
                UserDetails = new UserDetails()
                    {
                        Email = "alecs@mail.com",
                        FirstName = "Alecsandru",
                        LastName = "Tache",
                        Phone = "139057098375"
                    }
            };
            if (context.UserProfiles.FirstOrDefault(u => u.Username == "alex") != null) return;
            AddUser(context, user);

            context.Trainers.AddOrUpdate(t => t.Name,
                                         new Trainer()
                                             {
                                                 CompanyId = 1,
                                                 Address = "Str. Orsova, Nr. 26",
                                                 Name = "Alecsandru Tache",
                                                 Phone = "alecs@mail.com",
                                                 Subjects = subjects,
                                                 UserProfileId = user.Id
                                             });
            context.SaveChanges();
        }

        private void SeedStudents(AppContext context)
        {

            var customerId = context.Customers.FirstOrDefault().Id;

            var role = context.Roles.FirstOrDefault(r => r.RoleName == "Student");
            var user1 = new UserProfile()
            {
                Username = "ionel",
                Roles = new List<Role>() { role },
                UserDetails = new UserDetails()
                    {
                        Email = "ionel@ion.ion",
                        FirstName = "Ionel",
                        LastName = "Popescu",
                        Phone = "03418497814879"
                    }
            };
            var user2 = new UserProfile()
            {
                Username = "ghita",
                Roles = new List<Role>() { role },
                UserDetails = new UserDetails()
                    {
                        Email = "ghita@ghita.ghita",
                        FirstName = "Ghita",
                        LastName = "Alexandru",
                        Phone = "159379385"
                    }
            };


            if (context.UserProfiles.FirstOrDefault(u => u.Username == "ionel") == null)
            {

                AddUser(context, user1);
                context.Students.AddOrUpdate(s => s.Name,
                                             new Student()
                                                 {
                                                     Name = "Ionel Popescu",
                                                     CustomerId = customerId,
                                                     UserProfileId = user1.Id,
                                                 });
                context.SaveChanges();
            }

            if (context.UserProfiles.FirstOrDefault(u => u.Username == "ghita") == null)
            {
                AddUser(context, user2);
                context.Students.AddOrUpdate(s => s.Name,
                                                new Student()
                                                {
                                                    Name = "Ghita Alexandru",
                                                    CustomerId = customerId,
                                                    UserProfileId = user2.Id
                                                });
                context.SaveChanges();
            }
        }

        private void SeedCustomer(AppContext context)
        {
            var roles = context.Roles.Where(r => r.RoleName == "Customer Contact" || r.RoleName == "Customer Supervizor").ToList();
            var supervizor = context.Roles.FirstOrDefault(r => r.RoleName == "Customer Supervizor");

            var user1 = new UserProfile()
            {
                CompanyId = 1,
                Username = "ilc",
                Roles = new List<Role>(roles),
                UserDetails = new UserDetails()
                {
                    Email = "ilc@ilc.ilc",
                    FirstName = "Ilc",
                    LastName = "Boss",
                    Phone = "03418497814879"
                }
            };

            var user2 = new UserProfile()
            {
                CompanyId = 1,
                Username = "ilcSupervizor",
                Roles = new List<Role>() { supervizor },
                UserDetails = new UserDetails()
                {
                    Email = "ilcasd@ilc.ilc",
                    FirstName = "Ilc",
                    LastName = "Supervizor",
                    Phone = "03418497814879"
                }
            };

            AddUser(context, user1);
            AddUser(context, user2);

            context.Customers.AddOrUpdate(c => c.Name,
                new Customer()
                    {
                        CompanyId = 1,
                        BankAccount = "IBAN0912749126972",
                        Name = "Ilc",
                        BillingAddress = "Str. Whatever",
                        ContactPersons = new List<ContactPerson>()
                            {
                                new ContactPerson()
                                    {
                                        UserProfile = user1,
                                        IsMain = true
                                    },
                                new ContactPerson()
                                    {
                                        UserProfile = user2,
                                        IsMain = false
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

            // 
            var role = context.Roles.FirstOrDefault(r => r.RoleName == "Zeus");
            // create the user profile
            var firstUser = new UserProfile()
            {
                CompanyId = 1,
                Username = "admin",
                Roles = new List<Role>() { role },
                UserDetails = new UserDetails()
                    {
                        Email = "zeus@olympus.com",
                        FirstName = "Zeus",
                        LastName = "",
                        Phone = "91387983571"
                    }
            };
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
            var userExists = context.UserProfiles.FirstOrDefault(u => u.Username == user.Username);
            if (userExists != null)
            {
                user = userExists;
                return;
            }

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
