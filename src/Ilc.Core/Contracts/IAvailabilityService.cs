﻿using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IAvailabilityService
    {
        FilteredResults<Availability> GetFiltered(FilterArgumentsAvailability arguments);
        void Create(Availability availability);
        void Delete(int id);
    }
}