namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DynamicAssesments : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AssesmentResult",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        GradingAttributeId = c.Int(nullable: false),
                        CurrentGradeId = c.Int(nullable: false),
                        TargetGradeId = c.Int(nullable: false),
                        Assesment_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.GradingAttribute", t => t.GradingAttributeId, cascadeDelete: true)
                .ForeignKey("dbo.Grade", t => t.CurrentGradeId, cascadeDelete: false)
                .ForeignKey("dbo.Grade", t => t.TargetGradeId, cascadeDelete: false)
                .ForeignKey("dbo.Assesment", t => t.Assesment_Id)
                .Index(t => t.GradingAttributeId)
                .Index(t => t.CurrentGradeId)
                .Index(t => t.TargetGradeId)
                .Index(t => t.Assesment_Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.AssesmentResult", new[] { "Assesment_Id" });
            DropIndex("dbo.AssesmentResult", new[] { "TargetGradeId" });
            DropIndex("dbo.AssesmentResult", new[] { "CurrentGradeId" });
            DropIndex("dbo.AssesmentResult", new[] { "GradingAttributeId" });
            DropForeignKey("dbo.AssesmentResult", "Assesment_Id", "dbo.Assesment");
            DropForeignKey("dbo.AssesmentResult", "TargetGradeId", "dbo.Grade");
            DropForeignKey("dbo.AssesmentResult", "CurrentGradeId", "dbo.Grade");
            DropForeignKey("dbo.AssesmentResult", "GradingAttributeId", "dbo.GradingAttribute");
            DropTable("dbo.AssesmentResult");
        }
    }
}
