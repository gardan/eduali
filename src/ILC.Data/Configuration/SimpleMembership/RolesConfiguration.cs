using System.Data.Entity.ModelConfiguration;
using Ilc.Data.Models.SimpleMembership;

namespace Ilc.Data.Configuration.SimpleMembership
{
    public class RolesConfiguration : EntityTypeConfiguration<Role>
    {
        public RolesConfiguration()
        {
            // Primary Key
            HasKey(t => t.RoleId);

            // Ignore properties
            Ignore(t => t.Id);

            // Properties
            Property(t => t.RoleName)
                .IsRequired()
                .HasMaxLength(256);

            // Table & Column Mappings
            ToTable("webpages_Roles");
            Property(t => t.RoleId).HasColumnName("RoleId");
            Property(t => t.RoleName).HasColumnName("RoleName");

            HasMany(t => t.UserProfiles)
                .WithMany(t => t.Roles)
                .Map(m =>
                {
                    m.ToTable("webpages_UsersInRoles");
                    m.MapRightKey("RoleId");
                    m.MapLeftKey("UserId");
                });
        }
    }
}
