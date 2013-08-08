using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ilc.Web.Models
{
    public class GridConfigRequestParameters
    {
        public string Grid { get; set; }
    }

    public class GridConfigModel
    {
        public string Grid { get; set; }
        public string ColumnConfig { get; set; }
    }

    public class ColumnConfigurationModel
    {
        public bool Hidden { get; set; }
        public int Order { get; set; }
    }
}