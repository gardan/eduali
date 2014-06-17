namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedExpensesForTrainings : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Expense",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Ammount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        TrainingId = c.Int(nullable: false),
                        ExpenseTypeId = c.Int(nullable: false),
                        CreateDate = c.DateTimeOffset(nullable: false),
                        Creator_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Training", t => t.TrainingId, cascadeDelete: true)
                .ForeignKey("dbo.ExpenseType", t => t.ExpenseTypeId, cascadeDelete: true)
                .ForeignKey("dbo.UserProfile", t => t.Creator_Id)
                .Index(t => t.TrainingId)
                .Index(t => t.ExpenseTypeId)
                .Index(t => t.Creator_Id);
            
            CreateTable(
                "dbo.ExpenseType",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        CompanyId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Company", t => t.CompanyId, cascadeDelete: false)
                .Index(t => t.CompanyId);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.ExpenseType", new[] { "CompanyId" });
            DropIndex("dbo.Expense", new[] { "Creator_Id" });
            DropIndex("dbo.Expense", new[] { "ExpenseTypeId" });
            DropIndex("dbo.Expense", new[] { "TrainingId" });
            DropForeignKey("dbo.ExpenseType", "CompanyId", "dbo.Company");
            DropForeignKey("dbo.Expense", "Creator_Id", "dbo.UserProfile");
            DropForeignKey("dbo.Expense", "ExpenseTypeId", "dbo.ExpenseType");
            DropForeignKey("dbo.Expense", "TrainingId", "dbo.Training");
            DropTable("dbo.ExpenseType");
            DropTable("dbo.Expense");
        }
    }
}
