using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Ilc.Data.Models.Base;
using Ilc.Data.Models.Contracts;

namespace Ilc.Data.Models.SimpleMembership
{
    public class Role : EntityBase, IAccessControlEntity
    {

        public override int Id { get { return RoleId; } set { RoleId = value; } }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public virtual ICollection<UserProfile> UserProfiles { get; set; }
        public virtual ICollection<RoleClaim> Claims { get; set; }

        private ICollection<UserProfile> _owners;
        public virtual ICollection<UserProfile> Owners
        {
            get { return _owners ?? (_owners = new List<UserProfile>()); }
            protected set { _owners = value; }
        }
    }
}
