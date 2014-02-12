namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TemplateToCompany : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Template", "CompanyId", c => c.Int(nullable: false));
            Sql("EXEC('UPDATE dbo.Template SET CompanyId = 1')");
            AddForeignKey("dbo.Template", "CompanyId", "dbo.Company", "Id", cascadeDelete: true);
            CreateIndex("dbo.Template", "CompanyId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Template", new[] { "CompanyId" });
            DropForeignKey("dbo.Template", "CompanyId", "dbo.Company");
            DropColumn("dbo.Template", "CompanyId");
        }
    }
}
