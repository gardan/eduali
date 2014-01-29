using System;
using System.Collections.Generic;
using Ilc.Core.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class GenderService : IGenderService
    {
        public ICollection<Gender> GetAll()
        {
            return Genders.GetGenders();
        }
    }
}