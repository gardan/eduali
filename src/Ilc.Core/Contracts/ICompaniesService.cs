using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface ICompaniesService
    {
        FilteredResults<Company> GetFiltered(FilterArguments request);
        void Create(Company newCompany, UserProfile initialUser);
        Company GetById(int id);
        void Update(Company company);
    }
}
