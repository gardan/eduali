﻿using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IGradingSystemsService
    {
        void Create(GradingSystem gradingSystem);
        void Update(GradingSystem gradingSystem);
        GradingSystem GetById(int id);
        void DeleteSystemGrades(int id);
        void Delete(int id);
    }
}
