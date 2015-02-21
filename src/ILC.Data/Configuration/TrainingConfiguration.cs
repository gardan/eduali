using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Data.Configuration
{
    public class TrainingConfiguration : EntityTypeConfiguration<Training>
    {
        public TrainingConfiguration()
        {
            HasMany(t => t.StakeHolders)
                .WithMany(stakeholder => stakeholder.ActionableTrainings)
                .Map(m =>
                    {
                        m.ToTable("TrainingStakeHolders");
                        m.MapLeftKey("TrainingId");
                        m.MapRightKey("UserId");
                    });
        }
    }
}
