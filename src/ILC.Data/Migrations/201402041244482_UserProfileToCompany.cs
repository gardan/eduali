namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserProfileToCompany : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserProfile", "CompanyId", c => c.Int(nullable: false));
            Sql("UPDATE dbo.UserProfile SET CompanyId = 1");
            AddForeignKey("dbo.UserProfile", "CompanyId", "dbo.Company", "Id", cascadeDelete: false);
            CreateIndex("dbo.UserProfile", "CompanyId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.UserProfile", new[] { "CompanyId" });
            DropForeignKey("dbo.UserProfile", "CompanyId", "dbo.Company");
            DropColumn("dbo.UserProfile", "CompanyId");
        }
    }
}
