namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TrainerAvailability : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Availability",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StartDate = c.DateTimeOffset(nullable: false),
                        EndDate = c.DateTimeOffset(nullable: false),
                        TrainerId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Trainer", t => t.TrainerId, cascadeDelete: true)
                .Index(t => t.TrainerId);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Availability", new[] { "TrainerId" });
            DropForeignKey("dbo.Availability", "TrainerId", "dbo.Trainer");
            DropTable("dbo.Availability");
        }
    }
}
