namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class OneToOneTrainingTrainer : DbMigration
    {
        public override void Up()
        {
            // To be able to upgrade using code-based migration, we need to make sure there is a trainer with Id = 1,
            // and the uncomment the following line.
            // AddColumn("dbo.Training", "TrainerId", c => c.Int(nullable: false, defaultValue: 1));
            AddColumn("dbo.Training", "TrainerId", c => c.Int(nullable: false));
            AddForeignKey("dbo.Training", "TrainerId", "dbo.Trainer", "Id", cascadeDelete: true);
            CreateIndex("dbo.Training", "TrainerId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Training", new[] { "TrainerId" });
            DropForeignKey("dbo.Training", "TrainerId", "dbo.Trainer");
            DropColumn("dbo.Training", "TrainerId");
        }
    }
}
