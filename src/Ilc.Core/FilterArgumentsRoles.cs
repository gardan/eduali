namespace Ilc.Core
{
    public class FilterArgumentsRoles : FilterArguments
    {
        private bool _assigned = true;
        public int UserId { get; set; }
        public bool Assigned
        {
            get { return _assigned; }
            set { _assigned = value; }
        }
    }
}