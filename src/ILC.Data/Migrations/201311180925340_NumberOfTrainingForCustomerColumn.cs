namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NumberOfTrainingForCustomerColumn : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Training", "NoOfCustomerTraining", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Training", "NoOfCustomerTraining");
        }
    }
}
