namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class GridConfig : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GridConfig",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Grid = c.String(),
                        ColumnConfig = c.String(),
                        UserProfile_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UserProfile", t => t.UserProfile_Id)
                .Index(t => t.UserProfile_Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.GridConfig", new[] { "UserProfile_Id" });
            DropForeignKey("dbo.GridConfig", "UserProfile_Id", "dbo.UserProfile");
            DropTable("dbo.GridConfig");
        }
    }
}
