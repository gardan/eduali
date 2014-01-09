using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ilc.Misc
{
    public static class TimeUtils
    {
        public static IEnumerable<DateTimeOffset> EachDay(DateTimeOffset from, DateTimeOffset to)
        {
            for (var day = from.Date; day <= to.Date; day = day.AddDays(1))
            {
                yield return day;
            }
        }
    }
}
