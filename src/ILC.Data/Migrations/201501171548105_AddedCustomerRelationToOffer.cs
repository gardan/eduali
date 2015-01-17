namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedCustomerRelationToOffer : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Offer", "Customer_Id", c => c.Int());
            AddForeignKey("dbo.Offer", "Customer_Id", "dbo.Customer", "Id");
            CreateIndex("dbo.Offer", "Customer_Id");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Offer", new[] { "Customer_Id" });
            DropForeignKey("dbo.Offer", "Customer_Id", "dbo.Customer");
            DropColumn("dbo.Offer", "Customer_Id");
        }
    }
}
