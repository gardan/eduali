using System.ComponentModel.DataAnnotations;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class UserDetails : EntityBase
    {
        [Required]
        public virtual UserProfile UserProfile { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }
    }
}