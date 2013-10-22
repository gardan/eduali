namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RoleFlagToPreventDeletion : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.webpages_Roles", "CanDelete", c => c.Boolean(nullable: false, defaultValue: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.webpages_Roles", "CanDelete");
        }
    }
}
