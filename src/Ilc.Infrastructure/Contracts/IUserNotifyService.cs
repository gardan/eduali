using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ilc.Infrastructure.Contracts
{
    public interface IUserNotifyService
    {
        void Notify(string tpl, Dictionary<string, string> data);
    }
}
