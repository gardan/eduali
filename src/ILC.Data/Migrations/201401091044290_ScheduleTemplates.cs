namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ScheduleTemplates : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Template",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        CreateDate = c.DateTimeOffset(nullable: false),
                        Creator_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UserProfile", t => t.Creator_Id)
                .Index(t => t.Creator_Id);
            
            CreateTable(
                "dbo.TemplateDay",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StartDate = c.DateTimeOffset(nullable: false),
                        EndDate = c.DateTimeOffset(nullable: false),
                        OffDay = c.Boolean(nullable: false),
                        TemplateId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Template", t => t.TemplateId, cascadeDelete: true)
                .Index(t => t.TemplateId);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.TemplateDay", new[] { "TemplateId" });
            DropIndex("dbo.Template", new[] { "Creator_Id" });
            DropForeignKey("dbo.TemplateDay", "TemplateId", "dbo.Template");
            DropForeignKey("dbo.Template", "Creator_Id", "dbo.UserProfile");
            DropTable("dbo.TemplateDay");
            DropTable("dbo.Template");
        }
    }
}
