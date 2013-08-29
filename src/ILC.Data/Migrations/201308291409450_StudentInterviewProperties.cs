namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class StudentInterviewProperties : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.StudentInterview", "ReadingLevel", c => c.String());
            AddColumn("dbo.StudentInterview", "TargetReadingLevel", c => c.String());
            AddColumn("dbo.StudentInterview", "InteractiveTalkingLevel", c => c.String());
            AddColumn("dbo.StudentInterview", "TargetInteractiveTalkingLevel", c => c.String());
            AddColumn("dbo.StudentInterview", "ProductiveTalkingLevel", c => c.String());
            AddColumn("dbo.StudentInterview", "TargetProductiveTalkingLevel", c => c.String());
            AddColumn("dbo.StudentInterview", "WritingLevel", c => c.String());
            AddColumn("dbo.StudentInterview", "TargetWritingLevel", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.StudentInterview", "TargetWritingLevel");
            DropColumn("dbo.StudentInterview", "WritingLevel");
            DropColumn("dbo.StudentInterview", "TargetProductiveTalkingLevel");
            DropColumn("dbo.StudentInterview", "ProductiveTalkingLevel");
            DropColumn("dbo.StudentInterview", "TargetInteractiveTalkingLevel");
            DropColumn("dbo.StudentInterview", "InteractiveTalkingLevel");
            DropColumn("dbo.StudentInterview", "TargetReadingLevel");
            DropColumn("dbo.StudentInterview", "ReadingLevel");
        }
    }
}
