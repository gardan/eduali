namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NewFields : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Training", "TrainingId", c => c.String());
            AddColumn("dbo.Customer", "Department", c => c.String());
            AddColumn("dbo.UserDetails", "Initials", c => c.String());
            AddColumn("dbo.UserDetails", "Mobile", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Training", "TrainingId");
            DropColumn("dbo.UserDetails", "Mobile");
            DropColumn("dbo.UserDetails", "Initials");
            DropColumn("dbo.Customer", "Department");
        }
    }
}
