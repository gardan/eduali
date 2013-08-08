using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models.WebClient
{
    public class GridConfig : EntityBase
    {
        public string Grid { get; set; }
        public string ColumnConfig { get; set; }

        public virtual UserProfile UserProfile { get; set; }
    }
}
