namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TrainingOffer : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TrainingOffer",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        NoLessons = c.Int(nullable: false),
                        LessonDuration = c.Int(nullable: false),
                        TrainingId = c.Int(nullable: false),
                        CreateDate = c.DateTimeOffset(nullable: false),
                        Creator_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Training", t => t.TrainingId, cascadeDelete: true)
                .ForeignKey("dbo.UserProfile", t => t.Creator_Id)
                .Index(t => t.TrainingId)
                .Index(t => t.Creator_Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.TrainingOffer", new[] { "Creator_Id" });
            DropIndex("dbo.TrainingOffer", new[] { "TrainingId" });
            DropForeignKey("dbo.TrainingOffer", "Creator_Id", "dbo.UserProfile");
            DropForeignKey("dbo.TrainingOffer", "TrainingId", "dbo.Training");
            DropTable("dbo.TrainingOffer");
        }
    }
}
