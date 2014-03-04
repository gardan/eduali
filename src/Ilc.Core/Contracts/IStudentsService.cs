using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IStudentsService
    {
        FilteredResults<Student> GetFiltered(FilterArgumentsStudents parameters);
        Student GetByStudentId(int id);
        void Create(Student newStudent);
        void Update(Student updateStudent);
        void Delete(int id);
        Student GetByUserId(int currentUserId);
    }
}
