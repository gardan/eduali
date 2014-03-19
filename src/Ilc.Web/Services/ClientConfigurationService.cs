using Ilc.Core.Contracts;
using Ilc.Web.Filters.Request;
using ServiceStack;

namespace Ilc.Web.Services
{
    [IlcAuth]
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
            var user = Users.GetByEmail();

            return new ClientConfigurationModel()
                {
                    Username = user.Email,
                    FirstName = user.UserDetails.FirstName,
                    LastName = user.UserDetails.LastName,
                    Claims = usersClaims.ToArray(),
                    TrainerId = trainerId
                };
        }
    }

    [IlcAuth]
    public class ClientConfigurationModel
    {
        public ClientConfigurationModel()
        {
            TrainerId = -1;
        }

        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string[] Claims { get; set; }
        public int TrainerId { get; set; }
    }
}