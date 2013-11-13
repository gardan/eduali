namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TrainingColorColumn : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Training", "Color", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Training", "Color");
        }
    }
}
