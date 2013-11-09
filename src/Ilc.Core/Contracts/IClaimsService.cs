using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ilc.Core.Contracts
{
    public interface IClaimsService
    {
        List<string> GetAll();
        List<string> GetByUserId(int userId);
    }
}
