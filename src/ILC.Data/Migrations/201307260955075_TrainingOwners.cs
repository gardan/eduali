namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TrainingOwners : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserProfile", "Training_Id", c => c.Int());
            AddForeignKey("dbo.UserProfile", "Training_Id", "dbo.Training", "Id");
            CreateIndex("dbo.UserProfile", "Training_Id");
        }
        
        public override void Down()
        {
            DropIndex("dbo.UserProfile", new[] { "Training_Id" });
            DropForeignKey("dbo.UserProfile", "Training_Id", "dbo.Training");
            DropColumn("dbo.UserProfile", "Training_Id");
        }
    }
}
