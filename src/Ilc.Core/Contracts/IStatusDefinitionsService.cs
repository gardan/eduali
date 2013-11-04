using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IStatusDefinitionsService
    {
        FilteredResults<StatusDictionary> GetFiltered(FilterArgumentsStatusDefinitions parameters);
        StatusDictionary GetById(int id);
        void Update(StatusDictionary status);
    }
}