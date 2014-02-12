namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RoleToCompany : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.webpages_Roles", "CompanyId", c => c.Int(nullable: false));
            Sql("EXEC('UPDATE dbo.webpages_Roles SET CompanyId = 1)'");
            AddForeignKey("dbo.webpages_Roles", "CompanyId", "dbo.Company", "Id", cascadeDelete: true);
            CreateIndex("dbo.webpages_Roles", "CompanyId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.webpages_Roles", new[] { "CompanyId" });
            DropForeignKey("dbo.webpages_Roles", "CompanyId", "dbo.Company");
            DropColumn("dbo.webpages_Roles", "CompanyId");
        }
    }
}
