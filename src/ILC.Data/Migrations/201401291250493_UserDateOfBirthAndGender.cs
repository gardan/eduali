namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserDateOfBirthAndGender : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserDetails", "DateOfBirth", c => c.DateTimeOffset());
            AddColumn("dbo.UserDetails", "Gender", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.UserDetails", "Gender");
            DropColumn("dbo.UserDetails", "DateOfBirth");
        }
    }
}
