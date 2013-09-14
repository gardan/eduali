namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AnswersBugProperInheritance : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.RadioGroupAnswer", "TrainingEvaluation_Id", "dbo.TrainingEvaluation");
            DropForeignKey("dbo.CheckboxAnswer", "TrainingEvaluation_Id", "dbo.TrainingEvaluation");
            DropIndex("dbo.RadioGroupAnswer", new[] { "TrainingEvaluation_Id" });
            DropIndex("dbo.CheckboxAnswer", new[] { "TrainingEvaluation_Id" });
            AddColumn("dbo.RadioGroupAnswer", "TrainingEvaluationQuestionId", c => c.Int(nullable: false));
            AddColumn("dbo.RadioGroupAnswer", "TrainingEvaluationId", c => c.Int(nullable: false));
            AddColumn("dbo.CheckboxAnswer", "TrainingEvaluationQuestionId", c => c.Int(nullable: false));
            AddColumn("dbo.CheckboxAnswer", "TrainingEvaluationId", c => c.Int(nullable: false));
            AddForeignKey("dbo.RadioGroupAnswer", "TrainingEvaluationQuestionId", "dbo.TrainingEvaluationQuestion", "Id", cascadeDelete: true);
            AddForeignKey("dbo.RadioGroupAnswer", "TrainingEvaluationId", "dbo.TrainingEvaluation", "Id", cascadeDelete: true);
            AddForeignKey("dbo.CheckboxAnswer", "TrainingEvaluationQuestionId", "dbo.TrainingEvaluationQuestion", "Id", cascadeDelete: true);
            AddForeignKey("dbo.CheckboxAnswer", "TrainingEvaluationId", "dbo.TrainingEvaluation", "Id", cascadeDelete: true);
            CreateIndex("dbo.RadioGroupAnswer", "TrainingEvaluationQuestionId");
            CreateIndex("dbo.RadioGroupAnswer", "TrainingEvaluationId");
            CreateIndex("dbo.CheckboxAnswer", "TrainingEvaluationQuestionId");
            CreateIndex("dbo.CheckboxAnswer", "TrainingEvaluationId");
            DropColumn("dbo.RadioGroupAnswer", "TrainingEvaluation_Id");
            DropColumn("dbo.CheckboxAnswer", "TrainingEvaluation_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CheckboxAnswer", "TrainingEvaluation_Id", c => c.Int());
            AddColumn("dbo.RadioGroupAnswer", "TrainingEvaluation_Id", c => c.Int());
            DropIndex("dbo.CheckboxAnswer", new[] { "TrainingEvaluationId" });
            DropIndex("dbo.CheckboxAnswer", new[] { "TrainingEvaluationQuestionId" });
            DropIndex("dbo.RadioGroupAnswer", new[] { "TrainingEvaluationId" });
            DropIndex("dbo.RadioGroupAnswer", new[] { "TrainingEvaluationQuestionId" });
            DropForeignKey("dbo.CheckboxAnswer", "TrainingEvaluationId", "dbo.TrainingEvaluation");
            DropForeignKey("dbo.CheckboxAnswer", "TrainingEvaluationQuestionId", "dbo.TrainingEvaluationQuestion");
            DropForeignKey("dbo.RadioGroupAnswer", "TrainingEvaluationId", "dbo.TrainingEvaluation");
            DropForeignKey("dbo.RadioGroupAnswer", "TrainingEvaluationQuestionId", "dbo.TrainingEvaluationQuestion");
            DropColumn("dbo.CheckboxAnswer", "TrainingEvaluationId");
            DropColumn("dbo.CheckboxAnswer", "TrainingEvaluationQuestionId");
            DropColumn("dbo.RadioGroupAnswer", "TrainingEvaluationId");
            DropColumn("dbo.RadioGroupAnswer", "TrainingEvaluationQuestionId");
            CreateIndex("dbo.CheckboxAnswer", "TrainingEvaluation_Id");
            CreateIndex("dbo.RadioGroupAnswer", "TrainingEvaluation_Id");
            AddForeignKey("dbo.CheckboxAnswer", "TrainingEvaluation_Id", "dbo.TrainingEvaluation", "Id");
            AddForeignKey("dbo.RadioGroupAnswer", "TrainingEvaluation_Id", "dbo.TrainingEvaluation", "Id");
        }
    }
}
