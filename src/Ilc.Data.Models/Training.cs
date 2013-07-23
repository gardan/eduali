using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class Training : EntityBase
    {
        public DateTimeOffset PlannedStartDate { get; set; }
        public DateTimeOffset PlannedEndDate { get; set; }

        public DateTimeOffset DesiredStartDate { get; set; }
        public DateTimeOffset DesireEndDate { get; set; }

        public string Status { get; set; }
        public string Subject { get; set; }

        public ICollection<Student> Students { get; set; }


        public UserProfile[] Owners { get; set; }
    }
}
