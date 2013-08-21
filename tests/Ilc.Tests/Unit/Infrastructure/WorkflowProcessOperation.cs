using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core.Contracts;
using Ilc.Infrastructure;
using Ilc.Infrastructure.Workflows;
using Moq;
using NUnit.Framework;

namespace Ilc.Tests.Unit.Infrastructure
{
    [TestFixture]
    public class WorkflowProcessOperation
    {

        [Test]
        public void ajsdhjasd()
        {
            // Arrange
            var trainingsMock = new Mock<ITrainingsService>().Object;
            var wfActivity = new Training();

            var proc = new WorkflowProcess(new TrainingExtensionManager(trainingsMock), wfActivity);
            proc.Start();

            // Act

            // Assert

        }

    }
}
