using System;

namespace Ilc.Core
{
    public class FilterArgumentsAvailability : FilterArguments
    {
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
    }
}