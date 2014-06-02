namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedFileTemplate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.FileTemplate",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Content = c.String(),
                        Name = c.String(),
                        Type = c.Int(nullable: false),
                        CompanyId = c.Int(nullable: false),
                        CreateDate = c.DateTimeOffset(nullable: false),
                        Creator_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Company", t => t.CompanyId, cascadeDelete: true)
                .ForeignKey("dbo.UserProfile", t => t.Creator_Id)
                .Index(t => t.CompanyId)
                .Index(t => t.Creator_Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.FileTemplate", new[] { "Creator_Id" });
            DropIndex("dbo.FileTemplate", new[] { "CompanyId" });
            DropForeignKey("dbo.FileTemplate", "Creator_Id", "dbo.UserProfile");
            DropForeignKey("dbo.FileTemplate", "CompanyId", "dbo.Company");
            DropTable("dbo.FileTemplate");
        }
    }
}
