namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserDetailsGenderType : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.UserDetails", "Gender", c => c.Int());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.UserDetails", "Gender", c => c.String());
        }
    }
}
