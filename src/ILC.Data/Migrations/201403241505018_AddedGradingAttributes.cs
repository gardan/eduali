namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedGradingAttributes : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GradingAttribute",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Enabled = c.Boolean(nullable: false),
                        GradingSystemId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.GradingSystem", t => t.GradingSystemId, cascadeDelete: true)
                .Index(t => t.GradingSystemId);
            
            CreateTable(
                "dbo.GradingAttributeTraining",
                c => new
                    {
                        GradingAttribute_Id = c.Int(nullable: false),
                        Training_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.GradingAttribute_Id, t.Training_Id })
                .ForeignKey("dbo.GradingAttribute", t => t.GradingAttribute_Id)
                .ForeignKey("dbo.Training", t => t.Training_Id)
                .Index(t => t.GradingAttribute_Id)
                .Index(t => t.Training_Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.GradingAttributeTraining", new[] { "Training_Id" });
            DropIndex("dbo.GradingAttributeTraining", new[] { "GradingAttribute_Id" });
            DropIndex("dbo.GradingAttribute", new[] { "GradingSystemId" });
            DropForeignKey("dbo.GradingAttributeTraining", "Training_Id", "dbo.Training");
            DropForeignKey("dbo.GradingAttributeTraining", "GradingAttribute_Id", "dbo.GradingAttribute");
            DropForeignKey("dbo.GradingAttribute", "GradingSystemId", "dbo.GradingSystem");
            DropTable("dbo.GradingAttributeTraining");
            DropTable("dbo.GradingAttribute");
        }
    }
}
