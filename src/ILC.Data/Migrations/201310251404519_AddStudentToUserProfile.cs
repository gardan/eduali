namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddStudentToUserProfile : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Student", "UserProfileId", c => c.Int(nullable: false));
            AddForeignKey("dbo.Student", "UserProfileId", "dbo.UserProfile", "Id", cascadeDelete: true);
            CreateIndex("dbo.Student", "UserProfileId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Student", new[] { "UserProfileId" });
            DropForeignKey("dbo.Student", "UserProfileId", "dbo.UserProfile");
            DropColumn("dbo.Student", "UserProfileId");
        }
    }
}
