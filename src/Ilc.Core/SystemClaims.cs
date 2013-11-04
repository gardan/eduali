using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Ilc.Core
{
    public static class SystemClaims
    {
        public const string TasksSales = "tasks-sales";
        public const string TasksAdministration = "tasks-administration";
        public const string TasksCoordinator = "tasks-coordinator";
        public const string TasksTrainer = "tasks-trainer";
        public const string TasksStudent = "tasks-student";

        public static List<string> GetAll()
        {
            var type = typeof (SystemClaims);
            var fields = type.GetFields(BindingFlags.Static);

            var ret = new List<string>();
            foreach (var fieldInfo in fields)
            {
                ret.Add(fieldInfo.GetValue(null).ToString());
            }

            return ret;
        }
    }
}