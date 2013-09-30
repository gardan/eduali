using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IOffersService
    {
        FilteredResults<TrainingOffer> GetFiltered(FilterArgumentsOffers parameters);
        TrainingOffer GetById(int id);
        void Create(TrainingOffer newOffer);
        void Update(TrainingOffer updatedOffer);
        void Delete(int id);
    }
}