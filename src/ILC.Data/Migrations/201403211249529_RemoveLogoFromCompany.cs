namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveLogoFromCompany : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Company", "Logo");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Company", "Logo", c => c.String());
        }
    }
}
