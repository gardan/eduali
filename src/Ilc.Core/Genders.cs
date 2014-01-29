using System.Collections.Generic;
using Ilc.Data.Models;

namespace Ilc.Core
{
    public static class Genders
    {
        public static List<Gender> GetGenders()
        {
            return new List<Gender>()
                {
                    new Gender() { Id = 1, Name = "Male" },
                    new Gender() { Id = 2, Name = "Female" }
                };
        }
    }
}