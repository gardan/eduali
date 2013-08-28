namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TrainingEvaluationSchema : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TrainingEvaluation",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TrainingId = c.Int(nullable: false),
                        StudentId = c.Int(nullable: false),
                        CreateDate = c.DateTimeOffset(nullable: false),
                        Creator_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Training", t => t.TrainingId, cascadeDelete: true)
                .ForeignKey("dbo.Student", t => t.StudentId, cascadeDelete: false)
                .ForeignKey("dbo.UserProfile", t => t.Creator_Id)
                .Index(t => t.TrainingId)
                .Index(t => t.StudentId)
                .Index(t => t.Creator_Id);
            
            CreateTable(
                "dbo.StringAnswer",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Text = c.String(),
                        StringQuestionId = c.Int(nullable: false),
                        TrainingEvaluationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.StringQuestion", t => t.StringQuestionId, cascadeDelete: true)
                .ForeignKey("dbo.TrainingEvaluation", t => t.TrainingEvaluationId, cascadeDelete: true)
                .Index(t => t.StringQuestionId)
                .Index(t => t.TrainingEvaluationId);
            
            CreateTable(
                "dbo.StringQuestion",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Text = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.StringAnswer", new[] { "TrainingEvaluationId" });
            DropIndex("dbo.StringAnswer", new[] { "StringQuestionId" });
            DropIndex("dbo.TrainingEvaluation", new[] { "Creator_Id" });
            DropIndex("dbo.TrainingEvaluation", new[] { "StudentId" });
            DropIndex("dbo.TrainingEvaluation", new[] { "TrainingId" });
            DropForeignKey("dbo.StringAnswer", "TrainingEvaluationId", "dbo.TrainingEvaluation");
            DropForeignKey("dbo.StringAnswer", "StringQuestionId", "dbo.StringQuestion");
            DropForeignKey("dbo.TrainingEvaluation", "Creator_Id", "dbo.UserProfile");
            DropForeignKey("dbo.TrainingEvaluation", "StudentId", "dbo.Student");
            DropForeignKey("dbo.TrainingEvaluation", "TrainingId", "dbo.Training");
            DropTable("dbo.StringQuestion");
            DropTable("dbo.StringAnswer");
            DropTable("dbo.TrainingEvaluation");
        }
    }
}
