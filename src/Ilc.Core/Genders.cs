using System.Collections.Generic;
using Ilc.Data.Models;

namespace Ilc.Core
{
    public static class Genders
    {
        private static readonly List<Gender> GendersList = new List<Gender>()
                {
                    new Gender() { Id = 1, Name = "Male" },
                    new Gender() { Id = 2, Name = "Female" }
                };

        public static List<Gender> GetGenders()
        {
            return GendersList;
        }

        public static Gender GetGender(int id)
        {
            return GendersList.Find(g => g.Id == id);
        }
    }
}