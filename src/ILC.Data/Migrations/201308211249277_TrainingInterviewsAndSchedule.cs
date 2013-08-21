namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TrainingInterviewsAndSchedule : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.StudentInterview",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ListeningLevel = c.String(),
                        TargetListeningLevel = c.String(),
                        StudentId = c.Int(nullable: false),
                        TrainingId = c.Int(nullable: false),
                        CreateDate = c.DateTimeOffset(nullable: false),
                        Creator_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Student", t => t.StudentId, cascadeDelete: true)
                .ForeignKey("dbo.Training", t => t.TrainingId, cascadeDelete: false)
                .ForeignKey("dbo.UserProfile", t => t.Creator_Id)
                .Index(t => t.StudentId)
                .Index(t => t.TrainingId)
                .Index(t => t.Creator_Id);
            
            CreateTable(
                "dbo.TrainingScheduleDay",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LessonName = c.String(),
                        Order = c.Int(nullable: false),
                        StartDate = c.DateTimeOffset(nullable: false),
                        EndDate = c.DateTimeOffset(nullable: false),
                        TrainingId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Training", t => t.TrainingId, cascadeDelete: true)
                .Index(t => t.TrainingId);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.TrainingScheduleDay", new[] { "TrainingId" });
            DropIndex("dbo.StudentInterview", new[] { "Creator_Id" });
            DropIndex("dbo.StudentInterview", new[] { "TrainingId" });
            DropIndex("dbo.StudentInterview", new[] { "StudentId" });
            DropForeignKey("dbo.TrainingScheduleDay", "TrainingId", "dbo.Training");
            DropForeignKey("dbo.StudentInterview", "Creator_Id", "dbo.UserProfile");
            DropForeignKey("dbo.StudentInterview", "TrainingId", "dbo.Training");
            DropForeignKey("dbo.StudentInterview", "StudentId", "dbo.Student");
            DropTable("dbo.TrainingScheduleDay");
            DropTable("dbo.StudentInterview");
        }
    }
}
