namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SubjectsToCompany : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Subject", "CompanyId", c => c.Int());
            Sql("UPDATE dbo.Subject SET CompanyId = 1");
            AddForeignKey("dbo.Subject", "CompanyId", "dbo.Company", "Id");
            CreateIndex("dbo.Subject", "CompanyId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Subject", new[] { "CompanyId" });
            DropForeignKey("dbo.Subject", "CompanyId", "dbo.Company");
            DropColumn("dbo.Subject", "CompanyId");
        }
    }
}
