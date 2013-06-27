using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Data.Configuration
{
    public class UserProfileWorkspaceViewConfiguration : EntityTypeConfiguration<UserProfileWorkspaceView>
    {
        public UserProfileWorkspaceViewConfiguration()
        {
            HasKey(upwv => new { upwv.UserProfileId, upwv.WorkspaceViewId });
        }
    }
}
