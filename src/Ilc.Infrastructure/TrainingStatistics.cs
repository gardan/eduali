using System.Collections.Generic;

namespace Ilc.Infrastructure
{
    public class TrainingStatistics
    {
        public int MonthNr { get; set; }
        public Dictionary<string, int> Subjects { get; set; }
    }
}