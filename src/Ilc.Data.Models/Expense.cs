using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class Expense : StampedEntity
    {
        public decimal Ammount { get; set; }

        public int TrainingId { get; set; }
        [ForeignKey("TrainingId")]
        public Training Training { get; set; }

        public int ExpenseTypeId { get; set; }
        [ForeignKey("ExpenseTypeId")]
        public ExpenseType ExpenseType { get; set; }
    }

    public class ExpenseType : CompanyBaseEntity
    {
        public string Name { get; set; }
    }
}
