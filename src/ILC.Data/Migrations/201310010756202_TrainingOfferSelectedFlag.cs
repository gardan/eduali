namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TrainingOfferSelectedFlag : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TrainingOffer", "Selected", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.TrainingOffer", "Selected");
        }
    }
}
