using System.Collections.Generic;
using Ilc.Data.Models.SimpleMembership;

namespace Ilc.Core.Contracts
{
    public interface ICompanyDefaultsService
    {
        List<Role> CreateRoles(int companyId);
        void CreateStatusDefinitions(int companyId);
        void CreateSubjects(int companyId);
    }
}