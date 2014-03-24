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
        public const string TasksAdministration = "tasks-administrator";
        public const string TasksCoordinator = "tasks-coordinator";
        public const string TasksTrainer = "tasks-trainer";
        public const string TasksStudent = "tasks-student";

        public const string UiSettingsRead = "ui-settings-read";

        public const string MainCustomerContact = "common-main-customer-contact";
        public const string CustomerTrainingContact = "common-customer-training-contact";

        public const string AvailabilityReadAll = "availability-read";

        public const string CompanyReadAll = "company-read-all";
        public const string CompanyRead = "company-read";

        public const string TrainingReadAll = "training-read-all";

        public const string CustomerReadAll = "customer-read-all";

        public const string TrainersReadAll = "trainer-read-all";

        public const string StudentsReadAll = "student-read-all";

        public const string PlanningRead = "planning-read";

        public const string StatisticsRead = "statistics-read";

        public static List<string> GetAll()
        {
            var type = typeof (SystemClaims);
            var fields = type.GetFields(BindingFlags.Static | BindingFlags.Public | BindingFlags.FlattenHierarchy);

            var ret = new List<string>();
            foreach (var fieldInfo in fields)
            {
                ret.Add(fieldInfo.GetValue(null).ToString());
            }

            return ret;
        }
    }
}