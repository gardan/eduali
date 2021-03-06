namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TrainingLocationColumn : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Training", "Location", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Training", "Location");
        }
    }
}
