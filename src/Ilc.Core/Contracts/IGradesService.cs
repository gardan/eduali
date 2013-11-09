using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IGradesService
    {
        FilteredResults<Grade> GetFiltered(FilterArgumentsGrades arguments);
        void Create(Grade grade);
    }
}
