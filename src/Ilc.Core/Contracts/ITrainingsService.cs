﻿using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface ITrainingsService
    {
        FilteredResults<Training> GetOpenFiltered(FilterArgumentsOpenTrainings parameters);
        FilteredResults<Training> GetFilteredTrainings(FilterArgumentsTrainings parameters);
        Training GetById(int id);
        void Create(Training newTraining);
        void Update(Training updateTraining);
        void Delete(int id);
        IQueryable<Training> GetTrainingsById(List<int> ids);
    }
}
