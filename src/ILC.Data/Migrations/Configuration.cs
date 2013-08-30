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
