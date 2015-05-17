using System;

namespace Ilc.Core
{
    public class FilterArgumentsStudents : FilterArguments
    {
        public int CustomerId { get; set; }
        public DateTimeOffset TrainingDate { get; set; }
        public string Query { get; set; }
    }
}