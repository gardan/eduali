namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MadeSentAtFromOfferNullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Offer", "SentAt", c => c.DateTimeOffset());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Offer", "SentAt", c => c.DateTimeOffset(nullable: false));
        }
    }
}
