namespace Ilc.Core
{
    public class FilterArgumentsSubjects : FilterArguments
    {
        private bool _assigned = true;
        public int TrainerId { get; set; }
        public bool Assigned
        {
            get { return _assigned; }
            set { _assigned = value; }
        }
    }
}