using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface ITrainersService
    {
        FilteredResults<Trainer> GetFiltered(FilterArgumentsTrainers parameters);
        Trainer GetByTrainerId(int id);
        void Create(Trainer newTrainer);
        void Update(Trainer updateTrainer);
        void Delete(int id, bool deleteUser = true);
        Trainer GetByUserId(int id);
    }
}
