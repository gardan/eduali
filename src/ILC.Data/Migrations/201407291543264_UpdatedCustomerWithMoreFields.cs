namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdatedCustomerWithMoreFields : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customer", "FiscalCode", c => c.String());
            AddColumn("dbo.Customer", "CommerceNumber", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Customer", "CommerceNumber");
            DropColumn("dbo.Customer", "FiscalCode");
        }
    }
}
