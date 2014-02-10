using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class AvailabilityService : IAvailabilityService
    {
        public IUow Uow { get; set; }
        public ITrainersService Trainers { get; set; }
        public IUsersService Users { get; set; }
        public IAuthorizationService AuthorizationService { get; set; }

        public FilteredResults<Availability> GetFiltered(FilterArgumentsAvailability arguments)
        {
            if (arguments.StartDate == DateTimeOffset.MinValue) arguments.StartDate = DateTimeOffset.UtcNow;
            if (arguments.EndDate == DateTimeOffset.MinValue) arguments.EndDate = arguments.StartDate.AddDays(2);

            var user = Users.GetByEmail();
            var query = Uow.Availabilities.GetAll().Where(a => a.StartDate >= arguments.StartDate && a.EndDate <= arguments.EndDate && a.Trainer.CompanyId == user.CompanyId);


            if (AuthorizationService.HasClaim(SystemClaims.TasksTrainer) && !AuthorizationService.HasClaim(SystemClaims.AvailabilityReadAll))
            {
                var trainer = Trainers.GetByUserId(Users.GetByEmail().Id);
                if (trainer != null)
                {
                    query = query.Where(a => a.TrainerId == trainer.Id);
                }
                
            }


            return new FilteredResults<Availability>()
                {
                    Data = query.ToList(),
                    TotalDisplayRecords = query.Count(),
                    TotalRecords = query.Count()
                };
        }

        public void Create(Availability availability)
        {
            Uow.Availabilities.Add(availability);
            Uow.Commit();
        }

        public void Create(List<Availability> availabilities, bool overrideOnConflict = false)
        {
            var trainerId = availabilities.First().TrainerId;
            foreach (var availability in availabilities)
            {
                var inAvailability = availability;
                var conflictingAvailabilities =
                    Uow.Availabilities.GetAll().Where(a => a.TrainerId == trainerId &&
                                                           ((a.StartDate >= inAvailability.StartDate && a.StartDate < inAvailability.EndDate) ||
                                                           (a.EndDate >= inAvailability.StartDate && a.EndDate < inAvailability.EndDate))).ToList();
                if (conflictingAvailabilities.Count > 0)
                {
                    if (overrideOnConflict)
                    {
                        foreach (var conflictingAvailability in conflictingAvailabilities)
                        {
                            Delete(conflictingAvailability.Id);
                        }
                        continue;
                    }
                    throw new ArgumentException("Conflict with other availability days");
                }
            }

            foreach (var availability in availabilities)
            {
                Uow.Availabilities.Add(availability);
            }
            Uow.Commit();
            
        }

        public void Delete(int id)
        {
            Uow.Availabilities.Delete(id);
            Uow.Commit();
        }

        public void DeleteBy(int trainerId, DateTimeOffset startDate)
        {
            var availabilities =
                Uow.Availabilities.GetAll().Where(a => a.TrainerId == trainerId && a.StartDate >= startDate).ToList();
            foreach (var availability in availabilities)
            {
                Delete(availability.Id);
            }
        }
    }
}
