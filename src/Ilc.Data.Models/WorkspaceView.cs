using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class WorkspaceView : EntityBase
    {
        public string TemplateFileName { get; set; }

        public int Order { get; set; }
        public int Size { get; set; }

        public virtual List<UserProfileWorkspaceView> UserProfileWorkspaceViews { get; set; }
    }
}
