namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedDecoupledOffers : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Offer",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Amount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        SentAt = c.DateTimeOffset(nullable: false),
                        Accepted = c.Boolean(nullable: false),
                        PaymentDueAt = c.DateTimeOffset(nullable: false),
                        Tos = c.String(),
                        Payed = c.Boolean(nullable: false),
                        CreateDate = c.DateTimeOffset(nullable: false),
                        Creator_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UserProfile", t => t.Creator_Id)
                .Index(t => t.Creator_Id);
            
            CreateTable(
                "dbo.OfferTraining",
                c => new
                    {
                        Offer_Id = c.Int(nullable: false),
                        Training_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Offer_Id, t.Training_Id })
                .ForeignKey("dbo.Offer", t => t.Offer_Id, cascadeDelete: true)
                .ForeignKey("dbo.Training", t => t.Training_Id, cascadeDelete: true)
                .Index(t => t.Offer_Id)
                .Index(t => t.Training_Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.OfferTraining", new[] { "Training_Id" });
            DropIndex("dbo.OfferTraining", new[] { "Offer_Id" });
            DropIndex("dbo.Offer", new[] { "Creator_Id" });
            DropForeignKey("dbo.OfferTraining", "Training_Id", "dbo.Training");
            DropForeignKey("dbo.OfferTraining", "Offer_Id", "dbo.Offer");
            DropForeignKey("dbo.Offer", "Creator_Id", "dbo.UserProfile");
            DropTable("dbo.OfferTraining");
            DropTable("dbo.Offer");
        }
    }
}
