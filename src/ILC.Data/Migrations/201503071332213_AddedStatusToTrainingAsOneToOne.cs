namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedStatusToTrainingAsOneToOne : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Training", "StatusId", c => c.Int());
            AddForeignKey("dbo.Training", "StatusId", "dbo.StatusDictionary", "Id");
            CreateIndex("dbo.Training", "StatusId");
            DropColumn("dbo.Training", "Status");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Training", "Status", c => c.String());
            DropIndex("dbo.Training", new[] { "StatusId" });
            DropForeignKey("dbo.Training", "StatusId", "dbo.StatusDictionary");
            DropColumn("dbo.Training", "StatusId");
        }
    }
}
