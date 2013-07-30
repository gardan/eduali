using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IStudentsService
    {
        Student GetByStudentID(int id);
        void Create(Student newStudent);
        void Update(Student updateStudent);
        void Delete(int id);
    }
}
