using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Data.Configuration
{
    public class TrainingScheduleDayConfiguration : EntityTypeConfiguration<TrainingScheduleDay>
    {
        public TrainingScheduleDayConfiguration()
        {
//            HasRequired(sd => sd.Owner)
//                .WithMany(o => o.TrainingScheduleDays)
//                .HasForeignKey(sd => sd.OwnerId);
        }
    }
}
