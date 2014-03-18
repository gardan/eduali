using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;

namespace Ilc.Data
{
    public class MembershipRepository : Repository<Membership>, IMembershipRepository
    {
        public MembershipRepository(DbContext dbContext) : base(dbContext) { }

        public new virtual void Update(Membership entity)
        {
            var entityBase = (object)entity;
            var entityBase2 = entity;

            DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State == EntityState.Detached)
            {
                Membership attachedEntity = DbSet.Find(entityBase2.UserId);
                if (attachedEntity != null)
                {
                    var attachedEntry = DbContext.Entry(attachedEntity);
                    attachedEntry.CurrentValues.SetValues(entity);
                    attachedEntry.State = EntityState.Modified;
                }
                else
                {
                    dbEntityEntry.State = EntityState.Modified;
                }
            }
        }
    }
}
