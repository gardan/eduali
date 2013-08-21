using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core.Contracts;
using Ilc.Infrastructure.Contracts;

namespace Ilc.Infrastructure.Workflows
{
    public class TrainingExtensionManager : IExtensionManager
    {
        private readonly ITrainingsService _trainings;

        public TrainingExtensionManager(ITrainingsService trainings)
        {
            _trainings = trainings;
        }

        public void Configure(WorkflowApplication workflowApplication)
        {
            workflowApplication.Extensions.Add(_trainings);
        }
    }
}
