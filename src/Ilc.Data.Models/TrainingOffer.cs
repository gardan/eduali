using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class TrainingOffer : StampedEntity
    {
        public decimal Price { get; set; }
        public int NoLessons { get; set; }
        public int LessonDuration { get; set; }
    }
}