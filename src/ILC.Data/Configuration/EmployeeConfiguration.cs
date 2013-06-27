using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Data.Configuration
{
    public class EmployeeConfiguration : EntityTypeConfiguration<Employee>
    {
        public EmployeeConfiguration()
        {

            HasRequired(e => e.UserProfile)
                .WithOptional(u => u.Employee);

            //HasRequired(e => e.Department)
            //    .WithMany(d => d.Employees)
            //    .HasForeignKey(e => e.DepartmentId);


            HasMany(e => e.Parents)
                .WithMany(e => e.Childs)
                .Map(m =>
                {
                    m.ToTable("ChildParentEmployees");
                    m.MapLeftKey("ChildEmployeeId");
                    m.MapRightKey("ParentEmployeeId");
                });

            //HasMany(e => e.Shifts)
            //    .WithMany(s => s.Employees);
            // .Map(m =>
            //          {
            //              m.ToTable("EmployeeShift");
            //              m.MapLeftKey("ShiftId");
            //              m.MapRightKey("EmployeeId");
            //          });

            //HasRequired(e => e.Company)
            //    .WithMany(c => c.Employees)
            //    .HasForeignKey(e => e.CompanyId);
        }
    }
}
