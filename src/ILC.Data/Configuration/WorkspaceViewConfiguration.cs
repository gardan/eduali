using System.Data.Entity.ModelConfiguration;
using Ilc.Data.Models;

namespace Ilc.Data.Configuration
{
    public class WorkspaceViewConfiguration : EntityTypeConfiguration<WorkspaceView>
    {
        public WorkspaceViewConfiguration()
        {
            Ignore(wv => wv.Order);
            Ignore(wv => wv.Size);
            HasMany(upwv => upwv.UserProfileWorkspaceViews)
                .WithOptional()
                .HasForeignKey(upwv => upwv.WorkspaceViewId);
        }
    }
}