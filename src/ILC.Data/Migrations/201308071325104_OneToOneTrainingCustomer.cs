namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class OneToOneTrainingCustomer : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Training", "CustomerId", c => c.Int(nullable: false));
            AddForeignKey("dbo.Training", "CustomerId", "dbo.Customer", "Id", cascadeDelete: true);
            CreateIndex("dbo.Training", "CustomerId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Training", new[] { "CustomerId" });
            DropForeignKey("dbo.Training", "CustomerId", "dbo.Customer");
            DropColumn("dbo.Training", "CustomerId");
        }
    }
}
