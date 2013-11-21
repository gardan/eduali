using System.ComponentModel.DataAnnotations;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class TrainingOwnersConfiguration : EntityBase
    {
        public int SalesId { get; set; }
        public int AdministrationId { get; set; }
        public int CoordinatorId { get; set; }
        public int TrainerId { get; set; }

        [Required]
        public Training Training { get; set; }
    }
}