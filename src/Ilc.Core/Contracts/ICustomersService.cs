using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface ICustomersService
    {
        FilteredResults<Customer> GetFiltered(FilterArguments parameters);
        Customer GetByCustomerId(int id);
        void Create(Customer newCustomer);
        void Update(Customer updateCustomer);
        void Delete(int id);
    }
}
