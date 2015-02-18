namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedGradingSystemFromTraining : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Training", "GradingSystemId", "dbo.GradingSystem");
            DropForeignKey("dbo.GradingAttributeTraining", "GradingAttribute_Id", "dbo.GradingAttribute");
            DropForeignKey("dbo.GradingAttributeTraining", "Training_Id", "dbo.Training");
            DropIndex("dbo.Training", new[] { "GradingSystemId" });
            DropIndex("dbo.GradingAttributeTraining", new[] { "GradingAttribute_Id" });
            DropIndex("dbo.GradingAttributeTraining", new[] { "Training_Id" });
            AddColumn("dbo.Training", "GradingAttribute_Id", c => c.Int());
            AddForeignKey("dbo.Training", "GradingAttribute_Id", "dbo.GradingAttribute", "Id");
            CreateIndex("dbo.Training", "GradingAttribute_Id");
            DropColumn("dbo.Training", "GradingSystemId");
            DropTable("dbo.GradingAttributeTraining");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.GradingAttributeTraining",
                c => new
                    {
                        GradingAttribute_Id = c.Int(nullable: false),
                        Training_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.GradingAttribute_Id, t.Training_Id });
            
            AddColumn("dbo.Training", "GradingSystemId", c => c.Int(nullable: false));
            DropIndex("dbo.Training", new[] { "GradingAttribute_Id" });
            DropForeignKey("dbo.Training", "GradingAttribute_Id", "dbo.GradingAttribute");
            DropColumn("dbo.Training", "GradingAttribute_Id");
            CreateIndex("dbo.GradingAttributeTraining", "Training_Id");
            CreateIndex("dbo.GradingAttributeTraining", "GradingAttribute_Id");
            CreateIndex("dbo.Training", "GradingSystemId");
            AddForeignKey("dbo.GradingAttributeTraining", "Training_Id", "dbo.Training", "Id");
            AddForeignKey("dbo.GradingAttributeTraining", "GradingAttribute_Id", "dbo.GradingAttribute", "Id");
            AddForeignKey("dbo.Training", "GradingSystemId", "dbo.GradingSystem", "Id", cascadeDelete: true);
        }
    }
}
