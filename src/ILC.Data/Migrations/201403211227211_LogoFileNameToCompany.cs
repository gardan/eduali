namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class LogoFileNameToCompany : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Company", "Logo", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Company", "Logo");
        }
    }
}
