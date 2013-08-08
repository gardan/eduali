namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ManyToManyTrainingUserProfileOwnership : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.UserProfile", "Training_Id", "dbo.Training");
            DropIndex("dbo.UserProfile", new[] { "Training_Id" });
            CreateTable(
                "dbo.TrainingUserProfile",
                c => new
                    {
                        Training_Id = c.Int(nullable: false),
                        UserProfile_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Training_Id, t.UserProfile_Id })
                .ForeignKey("dbo.Training", t => t.Training_Id)
                .ForeignKey("dbo.UserProfile", t => t.UserProfile_Id)
                .Index(t => t.Training_Id)
                .Index(t => t.UserProfile_Id);
            
            DropColumn("dbo.UserProfile", "Training_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserProfile", "Training_Id", c => c.Int());
            DropIndex("dbo.TrainingUserProfile", new[] { "UserProfile_Id" });
            DropIndex("dbo.TrainingUserProfile", new[] { "Training_Id" });
            DropForeignKey("dbo.TrainingUserProfile", "UserProfile_Id", "dbo.UserProfile");
            DropForeignKey("dbo.TrainingUserProfile", "Training_Id", "dbo.Training");
            DropTable("dbo.TrainingUserProfile");
            CreateIndex("dbo.UserProfile", "Training_Id");
            AddForeignKey("dbo.UserProfile", "Training_Id", "dbo.Training", "Id");
        }
    }
}
