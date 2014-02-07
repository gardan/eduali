namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TrainerToCompany : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Trainer", "CompanyId", c => c.Int(nullable: false));
            Sql("UPDATE dbo.Trainer SET CompanyId = 1");
            AddForeignKey("dbo.Trainer", "CompanyId", "dbo.Company", "Id", cascadeDelete: false);
            CreateIndex("dbo.Trainer", "CompanyId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Trainer", new[] { "CompanyId" });
            DropForeignKey("dbo.Trainer", "CompanyId", "dbo.Company");
            DropColumn("dbo.Trainer", "CompanyId");
        }
    }
}
