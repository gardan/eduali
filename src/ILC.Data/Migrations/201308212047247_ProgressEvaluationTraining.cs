namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ProgressEvaluationTraining : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ProgressEvaluation",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Order = c.Int(nullable: false),
                        Progress = c.String(),
                        StudentId = c.Int(nullable: false),
                        TrainingId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Student", t => t.StudentId, cascadeDelete: true)
                .ForeignKey("dbo.Training", t => t.TrainingId)
                .Index(t => t.StudentId)
                .Index(t => t.TrainingId);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.ProgressEvaluation", new[] { "TrainingId" });
            DropIndex("dbo.ProgressEvaluation", new[] { "StudentId" });
            DropForeignKey("dbo.ProgressEvaluation", "TrainingId", "dbo.Training");
            DropForeignKey("dbo.ProgressEvaluation", "StudentId", "dbo.Student");
            DropTable("dbo.ProgressEvaluation");
        }
    }
}
