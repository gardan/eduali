namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedTrainerFromTraining : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Training", "TrainerId", "dbo.Trainer");
            DropIndex("dbo.Training", new[] { "TrainerId" });
            DropColumn("dbo.Training", "TrainerId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Training", "TrainerId", c => c.Int());
            CreateIndex("dbo.Training", "TrainerId");
            AddForeignKey("dbo.Training", "TrainerId", "dbo.Trainer", "Id");
        }
    }
}
