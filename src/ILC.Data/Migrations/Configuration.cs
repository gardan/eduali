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
        }
    }
}
