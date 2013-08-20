namespace Ilc.Web.Models
{
    public class CreateOfferModel
    {
        public decimal Price { get; set; }
        public int NoLessons { get; set; }
        public int LessonDuration { get; set; }
        public int TrainingId { get; set; }
    }
}