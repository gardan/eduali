namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.UserProfile", "Company_Id", "dbo.Company");
            DropForeignKey("dbo.Employee", "Id", "dbo.UserProfile");
            DropForeignKey("dbo.webpages_Roles", "CompanyId", "dbo.Company");
            DropForeignKey("dbo.ChildParentEmployees", "ChildEmployeeId", "dbo.Employee");
            DropForeignKey("dbo.ChildParentEmployees", "ParentEmployeeId", "dbo.Employee");
            DropIndex("dbo.UserProfile", new[] { "Company_Id" });
            DropIndex("dbo.Employee", new[] { "Id" });
            DropIndex("dbo.webpages_Roles", new[] { "CompanyId" });
            DropIndex("dbo.ChildParentEmployees", new[] { "ChildEmployeeId" });
            DropIndex("dbo.ChildParentEmployees", new[] { "ParentEmployeeId" });
            DropColumn("dbo.UserProfile", "Company_Id");
            DropTable("dbo.Employee");
            DropTable("dbo.Company");
            DropTable("dbo.ChildParentEmployees");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.ChildParentEmployees",
                c => new
                    {
                        ChildEmployeeId = c.Int(nullable: false),
                        ParentEmployeeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.ChildEmployeeId, t.ParentEmployeeId });
            
            CreateTable(
                "dbo.Company",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Address = c.String(),
                        TimeZoneId = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Employee",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        FirstName = c.String(),
                        LastName = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.UserProfile", "Company_Id", c => c.Int());
            CreateIndex("dbo.ChildParentEmployees", "ParentEmployeeId");
            CreateIndex("dbo.ChildParentEmployees", "ChildEmployeeId");
            CreateIndex("dbo.webpages_Roles", "CompanyId");
            CreateIndex("dbo.Employee", "Id");
            CreateIndex("dbo.UserProfile", "Company_Id");
            AddForeignKey("dbo.ChildParentEmployees", "ParentEmployeeId", "dbo.Employee", "Id");
            AddForeignKey("dbo.ChildParentEmployees", "ChildEmployeeId", "dbo.Employee", "Id");
            AddForeignKey("dbo.webpages_Roles", "CompanyId", "dbo.Company", "Id");
            AddForeignKey("dbo.Employee", "Id", "dbo.UserProfile", "Id");
            AddForeignKey("dbo.UserProfile", "Company_Id", "dbo.Company", "Id");
        }
    }
}
