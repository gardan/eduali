namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ManyToManyCustomerToUsersContactPersons : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ContactPerson", "Customer_Id", "dbo.Customer");
            DropIndex("dbo.ContactPerson", new[] { "Customer_Id" });
            RenameColumn(table: "dbo.ContactPerson", name: "Customer_Id", newName: "CustomerId");
            AddColumn("dbo.ContactPerson", "UserProfileId", c => c.Int(nullable: false));
            AddForeignKey("dbo.ContactPerson", "UserProfileId", "dbo.UserProfile", "Id", cascadeDelete: true);
            AddForeignKey("dbo.ContactPerson", "CustomerId", "dbo.Customer", "Id", cascadeDelete: true);
            CreateIndex("dbo.ContactPerson", "UserProfileId");
            CreateIndex("dbo.ContactPerson", "CustomerId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.ContactPerson", new[] { "CustomerId" });
            DropIndex("dbo.ContactPerson", new[] { "UserProfileId" });
            DropForeignKey("dbo.ContactPerson", "CustomerId", "dbo.Customer");
            DropForeignKey("dbo.ContactPerson", "UserProfileId", "dbo.UserProfile");
            DropColumn("dbo.ContactPerson", "UserProfileId");
            RenameColumn(table: "dbo.ContactPerson", name: "CustomerId", newName: "Customer_Id");
            CreateIndex("dbo.ContactPerson", "Customer_Id");
            AddForeignKey("dbo.ContactPerson", "Customer_Id", "dbo.Customer", "Id");
        }
    }
}
