namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DesireRenamedToDesired : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Training", "DesiredEndDate", c => c.DateTimeOffset(nullable: false));
            DropColumn("dbo.Training", "DesireEndDate");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Training", "DesireEndDate", c => c.DateTimeOffset(nullable: false));
            DropColumn("dbo.Training", "DesiredEndDate");
        }
    }
}
