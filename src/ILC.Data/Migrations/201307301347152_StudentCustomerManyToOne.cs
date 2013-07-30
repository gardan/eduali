namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class StudentCustomerManyToOne : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Student", "CustomerId", c => c.Int(nullable: false));
            AddForeignKey("dbo.Student", "CustomerId", "dbo.Customer", "Id", cascadeDelete: true);
            CreateIndex("dbo.Student", "CustomerId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Student", new[] { "CustomerId" });
            DropForeignKey("dbo.Student", "CustomerId", "dbo.Customer");
            DropColumn("dbo.Student", "CustomerId");
        }
    }
}
