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
                    "tasks-sales",
                    "tasks-administration",
                    "tasks-coordinator",
                    "tasks-trainer",
                    "tasks-student"
                };
        }
    }
}