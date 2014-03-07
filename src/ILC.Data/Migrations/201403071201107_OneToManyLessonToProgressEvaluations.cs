namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class OneToManyLessonToProgressEvaluations : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ProgressEvaluation", "TrainingScheduleDayId", c => c.Int(nullable: false));
            AddForeignKey("dbo.ProgressEvaluation", "TrainingScheduleDayId", "dbo.TrainingScheduleDay", "Id", cascadeDelete: false);
            CreateIndex("dbo.ProgressEvaluation", "TrainingScheduleDayId");
            DropColumn("dbo.ProgressEvaluation", "Order");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ProgressEvaluation", "Order", c => c.Int(nullable: false));
            DropIndex("dbo.ProgressEvaluation", new[] { "TrainingScheduleDayId" });
            DropForeignKey("dbo.ProgressEvaluation", "TrainingScheduleDayId", "dbo.TrainingScheduleDay");
            DropColumn("dbo.ProgressEvaluation", "TrainingScheduleDayId");
        }
    }
}
