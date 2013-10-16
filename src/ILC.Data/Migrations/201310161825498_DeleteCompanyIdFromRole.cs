namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DeleteCompanyIdFromRole : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.webpages_Roles", "CompanyId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.webpages_Roles", "CompanyId", c => c.Int());
        }
    }
}
