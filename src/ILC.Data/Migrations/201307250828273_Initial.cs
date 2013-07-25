namespace Ilc.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UserProfile",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Username = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.webpages_Roles",
                c => new
                    {
                        RoleId = c.Int(nullable: false, identity: true),
                        RoleName = c.String(nullable: false, maxLength: 256),
                        CompanyId = c.Int(),
                    })
                .PrimaryKey(t => t.RoleId);
            
            CreateTable(
                "dbo.RoleClaim",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Value = c.String(),
                        RoleId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.webpages_Roles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.Training",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PlannedStartDate = c.DateTimeOffset(nullable: false),
                        PlannedEndDate = c.DateTimeOffset(nullable: false),
                        DesiredStartDate = c.DateTimeOffset(nullable: false),
                        DesireEndDate = c.DateTimeOffset(nullable: false),
                        Status = c.String(),
                        Subject = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Student",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Training_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Training", t => t.Training_Id)
                .Index(t => t.Training_Id);
            
            CreateTable(
                "dbo.webpages_Membership",
                c => new
                    {
                        UserId = c.Int(nullable: false),
                        CreateDate = c.DateTime(),
                        ConfirmationToken = c.String(maxLength: 128),
                        IsConfirmed = c.Boolean(),
                        LastPasswordFailureDate = c.DateTime(),
                        PasswordFailuresSinceLastSuccess = c.Int(nullable: false),
                        Password = c.String(nullable: false, maxLength: 128),
                        PasswordChangedDate = c.DateTime(),
                        PasswordSalt = c.String(nullable: false, maxLength: 128),
                        PasswordVerificationToken = c.String(maxLength: 128),
                        PasswordVerificationTokenExpirationDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.UserId);
            
            CreateTable(
                "dbo.RoleUserProfile",
                c => new
                    {
                        Role_RoleId = c.Int(nullable: false),
                        UserProfile_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Role_RoleId, t.UserProfile_Id })
                .ForeignKey("dbo.webpages_Roles", t => t.Role_RoleId)
                .ForeignKey("dbo.UserProfile", t => t.UserProfile_Id)
                .Index(t => t.Role_RoleId)
                .Index(t => t.UserProfile_Id);
            
            CreateTable(
                "dbo.webpages_UsersInRoles",
                c => new
                    {
                        UserId = c.Int(nullable: false),
                        RoleId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.UserProfile", t => t.UserId)
                .ForeignKey("dbo.webpages_Roles", t => t.RoleId)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.webpages_UsersInRoles", new[] { "RoleId" });
            DropIndex("dbo.webpages_UsersInRoles", new[] { "UserId" });
            DropIndex("dbo.RoleUserProfile", new[] { "UserProfile_Id" });
            DropIndex("dbo.RoleUserProfile", new[] { "Role_RoleId" });
            DropIndex("dbo.Student", new[] { "Training_Id" });
            DropIndex("dbo.RoleClaim", new[] { "RoleId" });
            DropForeignKey("dbo.webpages_UsersInRoles", "RoleId", "dbo.webpages_Roles");
            DropForeignKey("dbo.webpages_UsersInRoles", "UserId", "dbo.UserProfile");
            DropForeignKey("dbo.RoleUserProfile", "UserProfile_Id", "dbo.UserProfile");
            DropForeignKey("dbo.RoleUserProfile", "Role_RoleId", "dbo.webpages_Roles");
            DropForeignKey("dbo.Student", "Training_Id", "dbo.Training");
            DropForeignKey("dbo.RoleClaim", "RoleId", "dbo.webpages_Roles");
            DropTable("dbo.webpages_UsersInRoles");
            DropTable("dbo.RoleUserProfile");
            DropTable("dbo.webpages_Membership");
            DropTable("dbo.Student");
            DropTable("dbo.Training");
            DropTable("dbo.RoleClaim");
            DropTable("dbo.webpages_Roles");
            DropTable("dbo.UserProfile");
        }
    }
}
