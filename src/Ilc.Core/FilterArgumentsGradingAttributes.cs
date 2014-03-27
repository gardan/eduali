namespace Ilc.Core
{
    public class FilterArgumentsGradingAttributes : FilterArguments
    {
        public FilterArgumentsGradingAttributes()
        {
            Assigned = true;
        }

        public int TrainingId { get; set; }
        public bool Assigned { get; set; }
    }
}