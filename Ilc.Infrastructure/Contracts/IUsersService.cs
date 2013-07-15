using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Infrastructure.Contracts
{
    public interface IUsersService
    {
        UserProfile GetByUsername(string username);
    }
}
