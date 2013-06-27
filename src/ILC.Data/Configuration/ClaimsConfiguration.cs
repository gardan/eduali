using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Data.Configuration
{
    public class ClaimsConfiguration : EntityTypeConfiguration<RoleClaim>
    {
        public ClaimsConfiguration()
        {
            // HasKey(c => new {c.Id, c.Name, c.RoleId});

            // Relations
            // HasRequired(c => c.Role)
            //    .WithOptional(r => r.Claims);
        }
    }
}
