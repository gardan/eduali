namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TrainingAcceptedFlag : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Training", "Accepted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Training", "Accepted");
        }
    }
}
