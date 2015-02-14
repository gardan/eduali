namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedOwnersConfiguration : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.TrainingOwnersConfiguration", "Id", "dbo.Training");
            DropIndex("dbo.TrainingOwnersConfiguration", new[] { "Id" });
            DropTable("dbo.TrainingOwnersConfiguration");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.TrainingOwnersConfiguration",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        SalesId = c.Int(nullable: false),
                        AdministrationId = c.Int(nullable: false),
                        CoordinatorId = c.Int(nullable: false),
                        TrainerId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateIndex("dbo.TrainingOwnersConfiguration", "Id");
            AddForeignKey("dbo.TrainingOwnersConfiguration", "Id", "dbo.Training", "Id");
        }
    }
}
