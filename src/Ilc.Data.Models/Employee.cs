using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class Employee : EntityBase
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        //public bool InheritLeaveTypes { get; set; }

        //public int DepartmentId { get; set; }
        //public Department Department { get; set; }

        public virtual UserProfile UserProfile { get; set; }
        //public virtual ICollection<LeaveType> LeaveTypes { get; set; }

        public virtual ICollection<Employee> Parents { get; set; }
        public virtual ICollection<Employee> Childs { get; set; }

        //public virtual ICollection<Shift> Shifts { get; set; }
    }
}
