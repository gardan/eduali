using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ilc.Core.Exceptions
{
    public class NotAllowedException : Exception
    {
        public NotAllowedException()
        {
            
        }

        public NotAllowedException(string msg) : base(msg)
        {
            
        }
    }
}
