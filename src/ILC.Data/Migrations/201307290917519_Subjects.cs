namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Subjects : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Subject",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Training", "SubjectId", c => c.Int(nullable: false));
            AddForeignKey("dbo.Training", "SubjectId", "dbo.Subject", "Id", cascadeDelete: true);
            CreateIndex("dbo.Training", "SubjectId");
            DropColumn("dbo.Training", "Subject");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Training", "Subject", c => c.String());
            DropIndex("dbo.Training", new[] { "SubjectId" });
            DropForeignKey("dbo.Training", "SubjectId", "dbo.Subject");
            DropColumn("dbo.Training", "SubjectId");
            DropTable("dbo.Subject");
        }
    }
}
