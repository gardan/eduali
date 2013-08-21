using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Infrastructure.Contracts;

namespace Ilc.Infrastructure.Workflows
{
    public class TrainingExtensionManager : IExtensionManager
    {
        private readonly ITrainingsService _trainings;
        private readonly IOffersService _offersMock;
        private readonly IUow _uow;

        public TrainingExtensionManager(ITrainingsService trainings, IOffersService offersMock, IUow uow)
        {
            _trainings = trainings;
            _offersMock = offersMock;
            _uow = uow;
        }

        public void Configure(WorkflowApplication workflowApplication)
        {
            workflowApplication.Extensions.Add(_uow);
            workflowApplication.Extensions.Add(_trainings);
            workflowApplication.Extensions.Add(_offersMock);
        }
    }
}
