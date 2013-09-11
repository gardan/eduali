namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EvaluationQuestions : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TrainingEvaluationQuestion",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Text = c.String(),
                        Type = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.RadioPossibleAnswer",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Text = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.RadioPossibleAnswerTrainingEvaluationQuestion",
                c => new
                    {
                        RadioPossibleAnswer_Id = c.Int(nullable: false),
                        TrainingEvaluationQuestion_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.RadioPossibleAnswer_Id, t.TrainingEvaluationQuestion_Id })
                .ForeignKey("dbo.RadioPossibleAnswer", t => t.RadioPossibleAnswer_Id)
                .ForeignKey("dbo.TrainingEvaluationQuestion", t => t.TrainingEvaluationQuestion_Id)
                .Index(t => t.RadioPossibleAnswer_Id)
                .Index(t => t.TrainingEvaluationQuestion_Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.RadioPossibleAnswerTrainingEvaluationQuestion", new[] { "TrainingEvaluationQuestion_Id" });
            DropIndex("dbo.RadioPossibleAnswerTrainingEvaluationQuestion", new[] { "RadioPossibleAnswer_Id" });
            DropForeignKey("dbo.RadioPossibleAnswerTrainingEvaluationQuestion", "TrainingEvaluationQuestion_Id", "dbo.TrainingEvaluationQuestion");
            DropForeignKey("dbo.RadioPossibleAnswerTrainingEvaluationQuestion", "RadioPossibleAnswer_Id", "dbo.RadioPossibleAnswer");
            DropTable("dbo.RadioPossibleAnswerTrainingEvaluationQuestion");
            DropTable("dbo.RadioPossibleAnswer");
            DropTable("dbo.TrainingEvaluationQuestion");
        }
    }
}
