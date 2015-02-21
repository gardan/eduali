namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedOwnerToTrainingScheduleDay : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TrainingScheduleDay", "OwnerId", c => c.Int(nullable: false));
            AddForeignKey("dbo.TrainingScheduleDay", "OwnerId", "dbo.UserProfile", "Id", cascadeDelete: true);
            CreateIndex("dbo.TrainingScheduleDay", "OwnerId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.TrainingScheduleDay", new[] { "OwnerId" });
            DropForeignKey("dbo.TrainingScheduleDay", "OwnerId", "dbo.UserProfile");
            DropColumn("dbo.TrainingScheduleDay", "OwnerId");
        }
    }
}
