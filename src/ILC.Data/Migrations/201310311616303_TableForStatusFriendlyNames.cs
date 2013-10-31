namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TableForStatusFriendlyNames : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.StatusDictionary",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        FriendlyName = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.StatusDictionary");
        }
    }
}
