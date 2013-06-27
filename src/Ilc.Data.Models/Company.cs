using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;
using Ilc.Data.Models.Contracts;
using WebMatrix.WebData;

namespace Ilc.Data.Models
{
    public class Company : EntityBase, IAccessControlEntity
    {
        public Company()
        {
            // Employees = new List<Employee>();
        }

        public string Name { get; set; }
        public string Address { get; set; }

        public string TimeZoneId { get; set; }

        // 1 - *
        // public virtual List<Employee> Employees { get; set; }
        //public virtual ICollection<Department> Departments { get; set; }
        //public virtual ICollection<LeaveType> LeaveTypes { get; set; }
        private ICollection<UserProfile> _owners;
        public virtual ICollection<UserProfile> Owners
        {
            get { return _owners ?? (_owners = new List<UserProfile>()); }
            protected set { _owners = value; }
        }
    }
}
