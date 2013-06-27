using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Data.Configuration
{
    public class UserProfileConfiguration : EntityTypeConfiguration<UserProfile>
    {
        public UserProfileConfiguration()
        {
            HasMany(userProfile => userProfile.Roles)
                .WithMany(r => r.UserProfiles)
                .Map(m =>
                {
                    m.ToTable("webpages_UsersInRoles");
                    m.MapLeftKey("UserId");
                    m.MapRightKey("RoleId");
                });

            HasMany(up => up.UserProfileWorkspaceViews)
                .WithOptional()
                .HasForeignKey(upwv => upwv.UserProfileId);
        }
    }
}
