using System;

namespace Ilc.Data.Models.Base
{
    public class StampedEntity : EntityBase
    {
        public DateTimeOffset CreateDate { get; set; }
        public UserProfile Creator { get; set; }
    }
}