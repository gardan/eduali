﻿using System.Collections.Generic;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class Student : EntityBase
    {
        public string Name { get; set; }
        public virtual ICollection<Training> Trainings { get; set; }
    }
}