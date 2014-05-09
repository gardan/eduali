using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core.Contracts;
using Ilc.Data.Models.Base;

namespace Ilc.Core.Helpers
{
    public class Stamper : IStamper
    {
        public IUsersService Users { get; set; }

        public void Stamp(StampedEntity entity)
        {
            if (entity.Creator != null) return;
            entity.Creator = Users.GetByEmail();
            entity.CreateDate = DateTimeOffset.UtcNow;
        }
    }

    public interface IStamper
    {
        void Stamp(StampedEntity entity);
    }
}
