namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedAssesments : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Assesment",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        EntryListeningLevel = c.String(),
                        ExitListeningLevel = c.String(),
                        EntryReadingLevel = c.String(),
                        ExittReadingLevel = c.String(),
                        EntryInteractiveTalkingLevel = c.String(),
                        ExitInteractiveTalkingLevel = c.String(),
                        EntryProductiveTalkingLevel = c.String(),
                        ExitProductiveTalkingLevel = c.String(),
                        EntryWritingLevel = c.String(),
                        ExitWritingLevel = c.String(),
                        EntryRemarks = c.String(),
                        ExitRemarks = c.String(),
                        TrainingId = c.Int(nullable: false),
                        StudentId = c.Int(nullable: false),
                        CreateDate = c.DateTimeOffset(nullable: false),
                        Creator_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Training", t => t.TrainingId, cascadeDelete: true)
                .ForeignKey("dbo.Student", t => t.StudentId, cascadeDelete: false)
                .ForeignKey("dbo.UserProfile", t => t.Creator_Id)
                .Index(t => t.TrainingId)
                .Index(t => t.StudentId)
                .Index(t => t.Creator_Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Assesment", new[] { "Creator_Id" });
            DropIndex("dbo.Assesment", new[] { "StudentId" });
            DropIndex("dbo.Assesment", new[] { "TrainingId" });
            DropForeignKey("dbo.Assesment", "Creator_Id", "dbo.UserProfile");
            DropForeignKey("dbo.Assesment", "StudentId", "dbo.Student");
            DropForeignKey("dbo.Assesment", "TrainingId", "dbo.Training");
            DropTable("dbo.Assesment");
        }
    }
}
