namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedAnswersToTrainingEvaluation : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RadioGroupAnswer",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AnswerId = c.Int(nullable: false),
                        TrainingEvaluation_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.RadioPossibleAnswer", t => t.AnswerId, cascadeDelete: true)
                .ForeignKey("dbo.TrainingEvaluation", t => t.TrainingEvaluation_Id)
                .Index(t => t.AnswerId)
                .Index(t => t.TrainingEvaluation_Id);
            
            CreateTable(
                "dbo.CheckboxAnswer",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Checked = c.Boolean(nullable: false),
                        TrainingEvaluation_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TrainingEvaluation", t => t.TrainingEvaluation_Id)
                .Index(t => t.TrainingEvaluation_Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.CheckboxAnswer", new[] { "TrainingEvaluation_Id" });
            DropIndex("dbo.RadioGroupAnswer", new[] { "TrainingEvaluation_Id" });
            DropIndex("dbo.RadioGroupAnswer", new[] { "AnswerId" });
            DropForeignKey("dbo.CheckboxAnswer", "TrainingEvaluation_Id", "dbo.TrainingEvaluation");
            DropForeignKey("dbo.RadioGroupAnswer", "TrainingEvaluation_Id", "dbo.TrainingEvaluation");
            DropForeignKey("dbo.RadioGroupAnswer", "AnswerId", "dbo.RadioPossibleAnswer");
            DropTable("dbo.CheckboxAnswer");
            DropTable("dbo.RadioGroupAnswer");
        }
    }
}
