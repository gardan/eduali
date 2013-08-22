namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TrainingWorkflowId : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Training", "WokrflowId", c => c.Guid(nullable: true));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Training", "WokrflowId");
        }
    }
}
