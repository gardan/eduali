using System;
using System.Collections.Generic;
using System.Linq;
using Ilc.Data.Contracts;
using Ilc.Infrastructure.Contracts;

namespace Ilc.Infrastructure.Services
{
    public class StatusService : IStatusService
    {
        public IUow Uow { get; set; }

        public string Translate(string status)
        {
            var statusDictionary = Uow.StatusDictionary.GetAll().FirstOrDefault(s => s.Name == status);

            if (statusDictionary != null) return statusDictionary.FriendlyName;

            throw new KeyNotFoundException("Status : " + status + " was not found.");
        }
    }
}