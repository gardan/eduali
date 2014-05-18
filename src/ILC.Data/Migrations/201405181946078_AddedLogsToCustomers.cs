namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedLogsToCustomers : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CustomerLog",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Body = c.String(),
                        Level = c.Int(nullable: false),
                        Type = c.String(),
                        CustomerId = c.Int(nullable: false),
                        CreateDate = c.DateTimeOffset(nullable: false),
                        Creator_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Customer", t => t.CustomerId, cascadeDelete: true)
                .ForeignKey("dbo.UserProfile", t => t.Creator_Id)
                .Index(t => t.CustomerId)
                .Index(t => t.Creator_Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.CustomerLog", new[] { "Creator_Id" });
            DropIndex("dbo.CustomerLog", new[] { "CustomerId" });
            DropForeignKey("dbo.CustomerLog", "Creator_Id", "dbo.UserProfile");
            DropForeignKey("dbo.CustomerLog", "CustomerId", "dbo.Customer");
            DropTable("dbo.CustomerLog");
        }
    }
}
