namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TrainingCompleteFlag : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Training", "Complete", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Training", "Complete");
        }
    }
}
