using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ilc.Misc
{
    public static class Utils
    {
        public static string GetRandomHexString(int length)
        {
            var ret = "";
            var random = new Random();
            for (var i = 0; i < length; i++)
            {
                int num = random.Next(16);
                ret += num.ToString("X");
            }

            return ret;
        }

        public static string[] SplitNameString(string name)
        {
            if (!name.Contains(" "))
            {
                return new []
                    {
                        name, 
                        name
                    };
            }

            return new string[]
                {
                    name.Split(Convert.ToChar("."))[0],
                    name.Substring(name.IndexOf(Convert.ToChar(" ")))
                };
        }
    }
}
