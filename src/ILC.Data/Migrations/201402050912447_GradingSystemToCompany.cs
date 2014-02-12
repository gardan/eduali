namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class GradingSystemToCompany : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.GradingSystem", "CompanyId", c => c.Int(nullable: false));
            Sql("EXEC('UPDATE dbo.GradingSystem SET CompanyId = 1')");
            AddForeignKey("dbo.GradingSystem", "CompanyId", "dbo.Company", "Id", cascadeDelete: false);
            CreateIndex("dbo.GradingSystem", "CompanyId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.GradingSystem", new[] { "CompanyId" });
            DropForeignKey("dbo.GradingSystem", "CompanyId", "dbo.Company");
            DropColumn("dbo.GradingSystem", "CompanyId");
        }
    }
}
