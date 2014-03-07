using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IProgressEvaluationsService
    {
        ProgressEvaluation Get(int trainingId, int lessonId, int studentId);
    }
}
