using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ilc.Core
{
    public class FilteredResults<T>
    {
        public int TotalRecords { get; set; }
        public int TotalDisplayRecords { get; set; }
        public virtual List<T> Data { get; set; }
    }
}
