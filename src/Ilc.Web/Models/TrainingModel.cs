namespace Ilc.Web.Models
{
    public class TrainingModel : CreateTrainingModel
    {
        public int Id { get; set; }

        public UserModel[] Owners { get; set; }

        public string TrainerName { get; set; }
        public string CustomerName { get; set; }
        public string Status { get; set; }
        public string Subject { get; set; }
    }
}