namespace Ilc.Core
{
    public class FilterArgumentsContacts : FilterArguments
    {
        public int CustomerId { get; set; }
        public int TrainingId { get; set; }
        public bool? IsMain { get; set; }
        public bool? IsTrainingContact { get; set; }
    }
}