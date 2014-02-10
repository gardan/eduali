namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedEmailAndRenamedUsernameToEmail : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserProfile", "Email", c => c.String());
            Sql("EXEC('UPDATE dbo.UserProfile SET Email = Username')");
            DropColumn("dbo.UserProfile", "Username");
            DropColumn("dbo.UserDetails", "Email");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserDetails", "Email", c => c.String());
            AddColumn("dbo.UserProfile", "Username", c => c.String());
            DropColumn("dbo.UserProfile", "Email");
        }
    }
}
