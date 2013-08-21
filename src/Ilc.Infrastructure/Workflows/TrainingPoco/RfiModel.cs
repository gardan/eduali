using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Infrastructure.Workflows.TrainingPoco
{
    public class RfiModel
    {
        public TrainingOffer Offer { get; set; }
        public bool Complete { get; set; }
    }
}
