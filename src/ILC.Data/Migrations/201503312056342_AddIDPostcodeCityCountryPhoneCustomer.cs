namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddIDPostcodeCityCountryPhoneCustomer : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customer", "CustomerId", c => c.String());
            AddColumn("dbo.Customer", "Postcode", c => c.String());
            AddColumn("dbo.Customer", "City", c => c.String());
            AddColumn("dbo.Customer", "Country", c => c.String());
            AddColumn("dbo.Customer", "Phone", c => c.String());
            AddColumn("dbo.Customer", "BankName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Customer", "BankName");
            DropColumn("dbo.Customer", "Phone");
            DropColumn("dbo.Customer", "Country");
            DropColumn("dbo.Customer", "City");
            DropColumn("dbo.Customer", "Postcode");
            DropColumn("dbo.Customer", "CustomerId");
        }
    }
}
