namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class OfferDetailsField : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TrainingOffer", "Details", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.TrainingOffer", "Details");
        }
    }
}
