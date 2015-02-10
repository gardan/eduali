namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddAddressFieldsToUserDetails : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserDetails", "Address", c => c.String());
            AddColumn("dbo.UserDetails", "City", c => c.String());
            AddColumn("dbo.UserDetails", "Country", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.UserDetails", "Country");
            DropColumn("dbo.UserDetails", "City");
            DropColumn("dbo.UserDetails", "Address");
        }
    }
}
