using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IContactsService
    {
        FilteredResults<ContactPerson> GetFiltered(FilterArgumentsContacts arguments);
        void Create(ContactPerson contact);
    }
}
