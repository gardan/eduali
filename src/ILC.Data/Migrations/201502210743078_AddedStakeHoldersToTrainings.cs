namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedStakeHoldersToTrainings : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TrainingStakeHolders",
                c => new
                    {
                        TrainingId = c.Int(nullable: false),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.TrainingId, t.UserId })
                .ForeignKey("dbo.Training", t => t.TrainingId, cascadeDelete: true)
                .ForeignKey("dbo.UserProfile", t => t.UserId, cascadeDelete: true)
                .Index(t => t.TrainingId)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.TrainingStakeHolders", new[] { "UserId" });
            DropIndex("dbo.TrainingStakeHolders", new[] { "TrainingId" });
            DropForeignKey("dbo.TrainingStakeHolders", "UserId", "dbo.UserProfile");
            DropForeignKey("dbo.TrainingStakeHolders", "TrainingId", "dbo.Training");
            DropTable("dbo.TrainingStakeHolders");
        }
    }
}
