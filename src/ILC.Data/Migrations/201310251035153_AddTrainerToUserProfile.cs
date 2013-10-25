namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddTrainerToUserProfile : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Trainer", "UserProfileId", c => c.Int(nullable: false));
            AddForeignKey("dbo.Trainer", "UserProfileId", "dbo.UserProfile", "Id", cascadeDelete: true);
            CreateIndex("dbo.Trainer", "UserProfileId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Trainer", new[] { "UserProfileId" });
            DropForeignKey("dbo.Trainer", "UserProfileId", "dbo.UserProfile");
            DropColumn("dbo.Trainer", "UserProfileId");
        }
    }
}
