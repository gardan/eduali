namespace Ilc.Web.Models
{
    public class TrainingModel : CreateTrainingModel
    {
        public int Id { get; set; }

        public UserModel[] Owners { get; set; }
    }
}