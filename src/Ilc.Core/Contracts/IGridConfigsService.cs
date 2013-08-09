using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.WebClient;

namespace Ilc.Core.Contracts
{
    public interface IGridConfigsService
    {
        FilteredResults<GridConfig> GetFiltered(string gridName);
        void Update(GridConfig entity);
    }
}
