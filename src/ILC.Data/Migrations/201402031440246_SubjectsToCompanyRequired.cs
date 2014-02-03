namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SubjectsToCompanyRequired : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Subject", "CompanyId", "dbo.Company");
            DropIndex("dbo.Subject", new[] { "CompanyId" });
            AlterColumn("dbo.Subject", "CompanyId", c => c.Int(nullable: false));
            AddForeignKey("dbo.Subject", "CompanyId", "dbo.Company", "Id", cascadeDelete: true);
            CreateIndex("dbo.Subject", "CompanyId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Subject", new[] { "CompanyId" });
            DropForeignKey("dbo.Subject", "CompanyId", "dbo.Company");
            AlterColumn("dbo.Subject", "CompanyId", c => c.Int());
            CreateIndex("dbo.Subject", "CompanyId");
            AddForeignKey("dbo.Subject", "CompanyId", "dbo.Company", "Id");
        }
    }
}
