using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class AssesmentsManager : IAssesmentsManager
    {
        public IUow Uow { get; set; }

        public FilteredResults<Assesment> GetFiltered(FilterArgumentsAssesments arguments)
        {
            // Should only return one, don't bother with paging and filtering.
            var query = Uow.Assesments.GetAll().Where(i => i.TrainingId == arguments.TrainingId && i.StudentId == arguments.StudentId);

            return new FilteredResults<Assesment>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = query.Count(),
                TotalRecords = query.Count()
            };
        }
    }
}
