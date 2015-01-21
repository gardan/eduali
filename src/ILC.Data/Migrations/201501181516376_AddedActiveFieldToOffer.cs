namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedActiveFieldToOffer : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Offer", "Active", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Offer", "Active");
        }
    }
}
