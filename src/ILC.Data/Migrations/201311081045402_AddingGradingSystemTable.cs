namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingGradingSystemTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GradingSystem",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Grade",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Order = c.Int(nullable: false),
                        GradingSystemId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.GradingSystem", t => t.GradingSystemId, cascadeDelete: true)
                .Index(t => t.GradingSystemId);
            
            AddColumn("dbo.Training", "GradingSystemId", c => c.Int(nullable: false));
            AddForeignKey("dbo.Training", "GradingSystemId", "dbo.GradingSystem", "Id", cascadeDelete: true);
            CreateIndex("dbo.Training", "GradingSystemId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Grade", new[] { "GradingSystemId" });
            DropIndex("dbo.Training", new[] { "GradingSystemId" });
            DropForeignKey("dbo.Grade", "GradingSystemId", "dbo.GradingSystem");
            DropForeignKey("dbo.Training", "GradingSystemId", "dbo.GradingSystem");
            DropColumn("dbo.Training", "GradingSystemId");
            DropTable("dbo.Grade");
            DropTable("dbo.GradingSystem");
        }
    }
}
