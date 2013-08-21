namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InterviewPlanTraining : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.InterviewPlan",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Date = c.DateTimeOffset(nullable: false),
                        Location = c.String(),
                        TrainingId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Training", t => t.TrainingId, cascadeDelete: true)
                .Index(t => t.TrainingId);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.InterviewPlan", new[] { "TrainingId" });
            DropForeignKey("dbo.InterviewPlan", "TrainingId", "dbo.Training");
            DropTable("dbo.InterviewPlan");
        }
    }
}
