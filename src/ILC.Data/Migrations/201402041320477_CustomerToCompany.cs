namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CustomerToCompany : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customer", "CompanyId", c => c.Int(nullable: false));
            Sql("UPDATE dbo.Customer SET CompanyId = 1");
            AddForeignKey("dbo.Customer", "CompanyId", "dbo.Company", "Id", cascadeDelete: false);
            CreateIndex("dbo.Customer", "CompanyId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Customer", new[] { "CompanyId" });
            DropForeignKey("dbo.Customer", "CompanyId", "dbo.Company");
            DropColumn("dbo.Customer", "CompanyId");
        }
    }
}
