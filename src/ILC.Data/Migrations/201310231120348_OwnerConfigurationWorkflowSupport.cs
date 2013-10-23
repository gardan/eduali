namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class OwnerConfigurationWorkflowSupport : DbMigration
    {
        public override void Up()
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
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Training", t => t.Id)
                .Index(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.TrainingOwnersConfiguration", new[] { "Id" });
            DropForeignKey("dbo.TrainingOwnersConfiguration", "Id", "dbo.Training");
            DropTable("dbo.TrainingOwnersConfiguration");
        }
    }
}
