namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedWeightToStatusAndRemovedFriendlyName : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.StatusDictionary", "Weight", c => c.Int(nullable: false));
            DropColumn("dbo.StatusDictionary", "FriendlyName");
        }
        
        public override void Down()
        {
            AddColumn("dbo.StatusDictionary", "FriendlyName", c => c.String());
            DropColumn("dbo.StatusDictionary", "Weight");
        }
    }
}
