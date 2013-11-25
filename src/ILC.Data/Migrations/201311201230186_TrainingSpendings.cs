namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TrainingSpendings : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Spendings",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Trainer = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Supplies = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Transport = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Training", t => t.Id)
                .Index(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Spendings", new[] { "Id" });
            DropForeignKey("dbo.Spendings", "Id", "dbo.Training");
            DropTable("dbo.Spendings");
        }
    }
}
