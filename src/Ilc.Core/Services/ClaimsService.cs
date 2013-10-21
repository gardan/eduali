using System;
using System.Collections.Generic;
using Ilc.Core.Contracts;

namespace Ilc.Core.Services
{
    public class ClaimsService : IClaimsService
    {
        public List<string> GetAll()
        {
            return new List<string>()
                {
                    "tasks-run-rfi",
                    "tasks-run-planinterview",
                    "tasks-run-interview"
                };
        }
    }
}