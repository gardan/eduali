using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models.WebClient;

namespace Ilc.Core.Services
{
    public class GridConfigsService : IGridConfigsService
    {
        public IUow Uow { get; set; }

        public FilteredResults<GridConfig> GetFiltered(string gridName)
        {
            return new FilteredResults<GridConfig>()
                {
                    Data = Uow.GridConfigs.GetAll().ToList()
                };
        }
    }
}