using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface ISubjectsService
    {
        FilteredResults<Subject> GetFiltered(FilterArguments parameters);
        Subject GetById(int id);
        void Create(Subject newSubject);
        void Update(Subject updatedSubject);
        void Delete(int id);
    }
}
