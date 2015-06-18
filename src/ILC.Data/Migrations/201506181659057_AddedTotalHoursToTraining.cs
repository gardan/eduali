namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedTotalHoursToTraining : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Training", "TotalHours", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Training", "TotalHours");
        }
    }
}
