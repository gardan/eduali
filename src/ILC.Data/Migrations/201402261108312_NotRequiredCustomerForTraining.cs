namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NotRequiredCustomerForTraining : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Training", "CustomerId", "dbo.Customer");
            DropIndex("dbo.Training", new[] { "CustomerId" });
            AlterColumn("dbo.Training", "CustomerId", c => c.Int(nullable:true));
            AddForeignKey("dbo.Training", "CustomerId", "dbo.Customer", "Id");
            CreateIndex("dbo.Training", "CustomerId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Training", new[] { "CustomerId" });
            DropForeignKey("dbo.Training", "CustomerId", "dbo.Customer");
            AlterColumn("dbo.Training", "CustomerId", c => c.Int(nullable: false));
            CreateIndex("dbo.Training", "CustomerId");
            AddForeignKey("dbo.Training", "CustomerId", "dbo.Customer", "Id", cascadeDelete: true);
        }
    }
}
