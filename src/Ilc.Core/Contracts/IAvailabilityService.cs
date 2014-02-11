using System;
using System.Collections.Generic;
using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IAvailabilityService
    {
        FilteredResults<Availability> GetFiltered(FilterArgumentsAvailability arguments);
        Availability GetById(int id);
        void Create(Availability availability);
        void Create(List<Availability> availabilities, bool overrideOnConflict);
        void Delete(int id);
        void DeleteBy(int trainerId, DateTimeOffset startDate);
        void Update(Availability availability);
    }
}