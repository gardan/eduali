namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedSubjectFile : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SubjectFile",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Filename = c.String(),
                        Directory = c.String(),
                        Description = c.String(),
                        SubjectId = c.Int(nullable: false),
                        CreateDate = c.DateTimeOffset(nullable: false),
                        Creator_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Subject", t => t.SubjectId, cascadeDelete: true)
                .ForeignKey("dbo.UserProfile", t => t.Creator_Id)
                .Index(t => t.SubjectId)
                .Index(t => t.Creator_Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.SubjectFile", new[] { "Creator_Id" });
            DropIndex("dbo.SubjectFile", new[] { "SubjectId" });
            DropForeignKey("dbo.SubjectFile", "Creator_Id", "dbo.UserProfile");
            DropForeignKey("dbo.SubjectFile", "SubjectId", "dbo.Subject");
            DropTable("dbo.SubjectFile");
        }
    }
}
