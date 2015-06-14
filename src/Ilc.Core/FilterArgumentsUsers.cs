using System;

namespace Ilc.Core
{
    public class FilterArgumentsUsers : FilterArguments
    {
        public string Claims { get; set; }
        public int TrainingId { get; set; }
        public string Query { get; set; }
        public DateTimeOffset LessonStartDate { get; set; }
        public DateTimeOffset LessonEndDate { get; set; }
    }
}