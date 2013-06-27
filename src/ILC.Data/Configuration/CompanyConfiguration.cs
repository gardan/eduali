using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Data.Configuration
{
    public class CompanyConfiguration : EntityTypeConfiguration<Company>
    {
        public CompanyConfiguration()
        {
            Property(c => c.Name).HasMaxLength(256);
        }
    }

    //public class DepartmentConfiguration : EntityTypeConfiguration<Department>
    //{
    //    public DepartmentConfiguration()
    //    {
    //        HasMany(d => d.Shifts)
    //            .WithMany(s => s.Departments);
    //    }
    //}
}
