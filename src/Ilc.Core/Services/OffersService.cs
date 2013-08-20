using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class OffersService : IOffersService
    {
        public IUow Uow { get; set; }

        public TrainingOffer GetById(int id)
        {
            return Uow.Offers.GetById(id);
        }

        public void Create(TrainingOffer newOffer)
        {
            // timestamps
            // TODO: this should be moved to a generic method that takes a StampedEntity as a parameter, stamps it, and returns it.
            newOffer.Creator = Uow.UserProfiles.GetById(1);
            newOffer.CreateDate = DateTimeOffset.UtcNow;

            Uow.Offers.Add(newOffer);
            Uow.Commit();
        }

        public void Update(TrainingOffer updatedOffer)
        {
            Uow.Offers.Update(updatedOffer);
            Uow.Commit();
        }

        public void Delete(int id)
        {
            Uow.Offers.Delete(id);
            Uow.Commit();
        }
    }
}
