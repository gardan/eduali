using System;
using System.Collections.Generic;
using Ilc.Data.Models;
using Ilc.Infrastructure.Contracts;

namespace Ilc.Infrastructure.Services
{
    public class AvailabilityTemplatesService : IAvailabilityTemplatesService
    {
        public IEnumerable<Availability> GetAvailabilities(int templateId, DateTimeOffset startDate, DateTimeOffset endDate)
        {
            throw new NotImplementedException();
        }
    }
}