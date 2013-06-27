using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ilc.Data.Models
{
    public class UserProfileWorkspaceView
    {
        public int UserProfileId { get; set; }
        public int WorkspaceViewId { get; set; }
        public virtual UserProfile UserProfile { get; set; }
        public virtual WorkspaceView WorkspaceView { get; set; }

        public int Order { get; set; }
        public int Size { get; set; }
    }
}
