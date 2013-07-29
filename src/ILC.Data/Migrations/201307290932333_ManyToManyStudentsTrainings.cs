namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ManyToManyStudentsTrainings : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Student", "Training_Id", "dbo.Training");
            DropIndex("dbo.Student", new[] { "Training_Id" });
            CreateTable(
                "dbo.StudentTraining",
                c => new
                    {
                        Student_Id = c.Int(nullable: false),
                        Training_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Student_Id, t.Training_Id })
                .ForeignKey("dbo.Student", t => t.Student_Id)
                .ForeignKey("dbo.Training", t => t.Training_Id)
                .Index(t => t.Student_Id)
                .Index(t => t.Training_Id);
            
            DropColumn("dbo.Student", "Training_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Student", "Training_Id", c => c.Int());
            DropIndex("dbo.StudentTraining", new[] { "Training_Id" });
            DropIndex("dbo.StudentTraining", new[] { "Student_Id" });
            DropForeignKey("dbo.StudentTraining", "Training_Id", "dbo.Training");
            DropForeignKey("dbo.StudentTraining", "Student_Id", "dbo.Student");
            DropTable("dbo.StudentTraining");
            CreateIndex("dbo.Student", "Training_Id");
            AddForeignKey("dbo.Student", "Training_Id", "dbo.Training", "Id");
        }
    }
}
