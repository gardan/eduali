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
    public class AvailabilityService : IAvailabilityService
    {
        public IUow Uow { get; set; }

        public FilteredResults<Availability> GetFiltered(FilterArgumentsAvailability arguments)
        {
            if (arguments.StartDate == DateTimeOffset.MinValue) arguments.StartDate = DateTimeOffset.UtcNow;
            if (arguments.EndDate == DateTimeOffset.MinValue) arguments.EndDate = arguments.StartDate.AddDays(2);

            var query = Uow.Availabilities.GetAll().Where(a => a.StartDate >= arguments.StartDate && a.EndDate <= arguments.EndDate);

            return new FilteredResults<Availability>()
                {
                    Data = query.ToList(),
                    TotalDisplayRecords = query.Count(),
                    TotalRecords = query.Count()
                };
        }
    }
}
