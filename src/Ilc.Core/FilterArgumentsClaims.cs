namespace Ilc.Core
{
    public class FilterArgumentsClaims : FilterArguments
    {
        private bool _assigned = true;
        public int RoleId { get; set; }
        public bool Assigned
        {
            get { return _assigned; }
            set { _assigned = value; }
        }
    }
}