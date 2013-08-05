namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TrainerPhoneAndAddress : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Trainer", "Phone", c => c.String());
            AddColumn("dbo.Trainer", "Address", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Trainer", "Address");
            DropColumn("dbo.Trainer", "Phone");
        }
    }
}
