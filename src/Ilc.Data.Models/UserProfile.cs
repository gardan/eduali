using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;
using Ilc.Data.Models.SimpleMembership;
using Ilc.Data.Models.WebClient;

namespace Ilc.Data.Models
{
    public class UserProfile : EntityBase
    {
        public string Email { get; set; }

        public int CompanyId { get; set; }
        [ForeignKey("CompanyId")]
        public Company Company { get; set; }
        
        private List<Role> _roles;
        public virtual List<Role> Roles
        {
            get { return _roles ?? (_roles = new List<Role>()); }
            set { _roles = value; }
        }
        // public virtual List<UserProfileWorkspaceView> UserProfileWorkspaceViews { get; set; }

        //public virtual ICollection<Company> OwnedCompanies { get; set; }

        //private ICollection<Department> _ownedDepartments;
        //public virtual ICollection<Department> OwnedDepartments
        //{
        //    get { return _ownedDepartments ?? (_ownedDepartments = new List<Department>()); }
        //    protected set { _ownedDepartments = value; }
        //}

        private ICollection<Role> _ownedRoles;
        public virtual ICollection<Role> OwnedRoles
        {
            get { return _ownedRoles ?? (_ownedRoles = new List<Role>()); }
            protected set { _ownedRoles = value; }
        }

        private ICollection<Training> _ownedTrainings; 
        public virtual ICollection<Training> OwnedTrainings {
            get { return _ownedTrainings ?? (_ownedTrainings = new List<Training>()); }
            protected set { _ownedTrainings = value; }
        }

        public virtual UserDetails UserDetails { get; set; }
    }
}
