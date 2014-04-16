﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IAssesmentsManager
    {
        FilteredResults<Assesment> GetFiltered(FilterArgumentsAssesments arguments);
    }
}
