using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Infrastructure;
using Ilc.Infrastructure.Workflows;
using Ilc.Infrastructure.Workflows.TrainingPoco;
using Moq;
using NUnit.Framework;
using Training = Ilc.Infrastructure.Workflows.Training;

namespace Ilc.Tests.Unit.Infrastructure
{
    [TestFixture]
    public class WorkflowProcessOperation
    {

        [Test]
        public void Start_To_Finish()
        {
            // Arrange
            var trainingsMock = new Mock<ITrainingsService>().Object;
            var offersMock = new Mock<IOffersService>().Object;
            var interviewPlanRepoMock = new Mock<IRepository<InterviewPlan>>();
            var interviewRepoMock = new Mock<IRepository<StudentInterview>>();
            var scheduleRepoMock = new Mock<IRepository<TrainingScheduleDay>>(); 
            var progressEvalRepoMock = new Mock<IRepository<ProgressEvaluation>>();
            var uowMock = new Mock<IUow>();
            uowMock.Setup(uow => uow.InterviewPlans).Returns(interviewPlanRepoMock.Object);
            uowMock.Setup(uow => uow.Interviews).Returns(interviewRepoMock.Object);
            uowMock.Setup(uow => uow.TrainingScheduleDays).Returns(scheduleRepoMock.Object);
            uowMock.Setup(uow => uow.ProgressEvaluations).Returns(progressEvalRepoMock.Object);
            var extensionManager = new TrainingExtensionManager(trainingsMock, offersMock, uowMock.Object);
            

            var wfActivity = new Training();

            var proc = new WorkflowProcess(extensionManager, wfActivity);
            
            // Act
             proc.Start();
            var firstOffer = new TrainingOffer() { Id = 1 };
            // Create an offer
            var results = proc.Resume(Guid.Empty, TrainingStatus.Rfi, new Dictionary<string, object>()
                {
                    { "Offer", firstOffer },
                });
            var firstOfferTest = results["Offer"];
            // Move to the next state
            results = proc.Resume(Guid.Empty, TrainingStatus.Rfi, new Dictionary<string, object>());
            
            results = proc.Resume(Guid.Empty, TrainingStatus.PlanInterview, new Dictionary<string, object>()
                {
                    { "InterviewPlan", new InterviewPlan() }
                });

            // Add the interviews
            var interview = new StudentInterview();

            results = proc.Resume(Guid.Empty, TrainingStatus.Interview, new Dictionary<string, object>()
                {
                    { "Interview", interview }
                });
            // Move to the next state
            results = proc.Resume(Guid.Empty, TrainingStatus.Interview, new Dictionary<string, object>());

            results = proc.Resume(Guid.Empty, TrainingStatus.Offer, new Dictionary<string, object>()
                {
                    { "Complete", true }
                });


            var schedule = new List<TrainingScheduleDay>() {new TrainingScheduleDay()};
            results = proc.Resume(Guid.Empty, TrainingStatus.Accepted, new Dictionary<string, object>()
                {
                    { "Schedule", schedule }
                });
                                  

            proc.Resume(Guid.Empty, TrainingStatus.Planned, new Dictionary<string, object>());

            var progressEval = new ProgressEvaluation();
            proc.Resume(Guid.Empty, TrainingStatus.ProgressEvaluation, new Dictionary<string, object>()
                {
                    { "ProgressEvaluation", progressEval }
                });

            // results = 
            // Assert

        }

    }
}
