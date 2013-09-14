namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AnswersAreAllConnectedToASingleQuestion : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.StringAnswer", "StringQuestionId", "dbo.StringQuestion");
            DropIndex("dbo.StringAnswer", new[] { "StringQuestionId" });
            AddColumn("dbo.StringAnswer", "TrainingEvaluationQuestionId", c => c.Int(nullable: false));
            AddForeignKey("dbo.StringAnswer", "TrainingEvaluationQuestionId", "dbo.TrainingEvaluationQuestion", "Id", cascadeDelete: true);
            CreateIndex("dbo.StringAnswer", "TrainingEvaluationQuestionId");
            DropColumn("dbo.StringAnswer", "StringQuestionId");
            DropTable("dbo.StringQuestion");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.StringQuestion",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Text = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.StringAnswer", "StringQuestionId", c => c.Int(nullable: false));
            DropIndex("dbo.StringAnswer", new[] { "TrainingEvaluationQuestionId" });
            DropForeignKey("dbo.StringAnswer", "TrainingEvaluationQuestionId", "dbo.TrainingEvaluationQuestion");
            DropColumn("dbo.StringAnswer", "TrainingEvaluationQuestionId");
            CreateIndex("dbo.StringAnswer", "StringQuestionId");
            AddForeignKey("dbo.StringAnswer", "StringQuestionId", "dbo.StringQuestion", "Id", cascadeDelete: true);
        }
    }
}
