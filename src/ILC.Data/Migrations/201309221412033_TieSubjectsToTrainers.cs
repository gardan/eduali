namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TieSubjectsToTrainers : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TrainerSubject",
                c => new
                    {
                        Trainer_Id = c.Int(nullable: false),
                        Subject_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Trainer_Id, t.Subject_Id })
                .ForeignKey("dbo.Trainer", t => t.Trainer_Id)
                .ForeignKey("dbo.Subject", t => t.Subject_Id)
                .Index(t => t.Trainer_Id)
                .Index(t => t.Subject_Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.TrainerSubject", new[] { "Subject_Id" });
            DropIndex("dbo.TrainerSubject", new[] { "Trainer_Id" });
            DropForeignKey("dbo.TrainerSubject", "Subject_Id", "dbo.Subject");
            DropForeignKey("dbo.TrainerSubject", "Trainer_Id", "dbo.Trainer");
            DropTable("dbo.TrainerSubject");
        }
    }
}
