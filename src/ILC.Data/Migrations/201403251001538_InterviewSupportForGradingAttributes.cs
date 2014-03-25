namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InterviewSupportForGradingAttributes : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.InterviewResult",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        GradingAttributeId = c.Int(nullable: false),
                        CurrentGradeId = c.Int(nullable: false),
                        TargetGradeId = c.Int(nullable: false),
                        Grade_Id = c.Int(),
                        StudentInterview_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Grade", t => t.Grade_Id)
                .ForeignKey("dbo.GradingAttribute", t => t.GradingAttributeId, cascadeDelete: false)
                .ForeignKey("dbo.Grade", t => t.CurrentGradeId, cascadeDelete: false)
                .ForeignKey("dbo.Grade", t => t.TargetGradeId, cascadeDelete: false)
                .ForeignKey("dbo.StudentInterview", t => t.StudentInterview_Id)
                .Index(t => t.Grade_Id)
                .Index(t => t.GradingAttributeId)
                .Index(t => t.CurrentGradeId)
                .Index(t => t.TargetGradeId)
                .Index(t => t.StudentInterview_Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.InterviewResult", new[] { "StudentInterview_Id" });
            DropIndex("dbo.InterviewResult", new[] { "TargetGradeId" });
            DropIndex("dbo.InterviewResult", new[] { "CurrentGradeId" });
            DropIndex("dbo.InterviewResult", new[] { "GradingAttributeId" });
            DropIndex("dbo.InterviewResult", new[] { "Grade_Id" });
            DropForeignKey("dbo.InterviewResult", "StudentInterview_Id", "dbo.StudentInterview");
            DropForeignKey("dbo.InterviewResult", "TargetGradeId", "dbo.Grade");
            DropForeignKey("dbo.InterviewResult", "CurrentGradeId", "dbo.Grade");
            DropForeignKey("dbo.InterviewResult", "GradingAttributeId", "dbo.GradingAttribute");
            DropForeignKey("dbo.InterviewResult", "Grade_Id", "dbo.Grade");
            DropTable("dbo.InterviewResult");
        }
    }
}
