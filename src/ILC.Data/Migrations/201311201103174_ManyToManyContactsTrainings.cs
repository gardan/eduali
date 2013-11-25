namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ManyToManyContactsTrainings : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ContactPersonTraining",
                c => new
                    {
                        ContactPerson_Id = c.Int(nullable: false),
                        Training_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.ContactPerson_Id, t.Training_Id })
                .ForeignKey("dbo.ContactPerson", t => t.ContactPerson_Id)
                .ForeignKey("dbo.Training", t => t.Training_Id)
                .Index(t => t.ContactPerson_Id)
                .Index(t => t.Training_Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.ContactPersonTraining", new[] { "Training_Id" });
            DropIndex("dbo.ContactPersonTraining", new[] { "ContactPerson_Id" });
            DropForeignKey("dbo.ContactPersonTraining", "Training_Id", "dbo.Training");
            DropForeignKey("dbo.ContactPersonTraining", "ContactPerson_Id", "dbo.ContactPerson");
            DropTable("dbo.ContactPersonTraining");
        }
    }
}
