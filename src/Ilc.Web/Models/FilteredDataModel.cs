using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ilc.Web.Models
{
    public class FilteredDataModel<T>
    {
        public int TotalRecords { get; set; }
        public int TotalDisplayRecords { get; set; }
        public virtual List<T> Data { get; set; }
    }
}