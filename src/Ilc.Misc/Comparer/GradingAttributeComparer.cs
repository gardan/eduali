using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Misc.Comparer
{
    public class GradingAttributeComparer : IEqualityComparer<GradingAttribute>
    {
        public bool Equals(GradingAttribute x, GradingAttribute y)
        {
            return x.Id == y.Id;
        }

        public int GetHashCode(GradingAttribute obj)
        {
            return 0;
        }
    }
}
