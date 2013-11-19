namespace Ilc.Core
{
    public class FilterArgumentsContacts : FilterArguments
    {
        public int CustomerId { get; set; }
        public bool? IsMain { get; set; }
        public bool? IsTrainingContact { get; set; }
    }
}