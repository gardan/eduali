using Ilc.Core.Contracts;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class ClientConfigurationService : Service
    {
        public IUsersService Users { get; set; }
        public IClaimsService Claims { get; set; }
        public ITrainersService Trainers { get; set; }

        public ClientConfigurationModel Get(ClientConfigurationModel request)
        {
            var userId = Users.GetByEmail().Id;
            var usersClaims = Claims.GetByUserId(userId);
            var trainerId = -1;

            var trainer = Trainers.GetByUserId(userId);
            if (trainer != null) trainerId = trainer.Id;

            return new ClientConfigurationModel()
                {
                    Username = Users.GetByEmail().Email,
                    Claims = usersClaims.ToArray(),
                    TrainerId = trainerId
                };
        }
    }

    public class ClientConfigurationModel
    {
        public ClientConfigurationModel()
        {
            TrainerId = -1;
        }

        public string Username { get; set; }
        public string[] Claims { get; set; }
        public int TrainerId { get; set; }
    }
}