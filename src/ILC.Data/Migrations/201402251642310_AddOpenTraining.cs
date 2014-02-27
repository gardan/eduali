namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddOpenTraining : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Training", "Public", c => c.Boolean(nullable: false));
            AddColumn("dbo.Training", "RequiredStudents", c => c.Int(nullable: false));
            AddColumn("dbo.Training", "Price", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.Training", "DateOfValidation", c => c.DateTimeOffset(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Training", "DateOfValidation");
            DropColumn("dbo.Training", "Price");
            DropColumn("dbo.Training", "RequiredStudents");
            DropColumn("dbo.Training", "Public");
        }
    }
}
