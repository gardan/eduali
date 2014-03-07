using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IProgressEvaluationsService
    {
        FilteredResults<ProgressEvaluation> GetFiltered(FilterArgumentsProgressEvaluations arguments);
        ProgressEvaluation GetById(int id);
        void Update(ProgressEvaluation evaluation);
    }
}
