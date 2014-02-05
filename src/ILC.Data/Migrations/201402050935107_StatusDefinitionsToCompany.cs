namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class StatusDefinitionsToCompany : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.StatusDictionary", "CompanyId", c => c.Int(nullable: false));
            Sql("UPDATE dbo.StatusDictionary SET CompanyId = 1");
            AddForeignKey("dbo.StatusDictionary", "CompanyId", "dbo.Company", "Id", cascadeDelete: true);
            CreateIndex("dbo.StatusDictionary", "CompanyId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.StatusDictionary", new[] { "CompanyId" });
            DropForeignKey("dbo.StatusDictionary", "CompanyId", "dbo.Company");
            DropColumn("dbo.StatusDictionary", "CompanyId");
        }
    }
}
