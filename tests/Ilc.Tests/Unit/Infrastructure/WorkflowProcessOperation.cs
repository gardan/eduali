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
        public void ajsdhjasd()
        {
            // Arrange
            var trainingsMock = new Mock<ITrainingsService>().Object;
            var offersMock = new Mock<IOffersService>().Object;
            var interviewPlanRepoMock = new Mock<IRepository<InterviewPlan>>();
            var interviewRepoMock = new Mock<IRepository<StudentInterview>>();
            var scheduleRepoMock = new Mock<IRepository<TrainingScheduleDay>>(); 
            var uowMock = new Mock<IUow>();
            uowMock.Setup(uow => uow.InterviewPlans).Returns(interviewPlanRepoMock.Object);
            uowMock.Setup(uow => uow.Interviews).Returns(interviewRepoMock.Object);
            uowMock.Setup(uow => uow.TrainingScheduleDays).Returns(scheduleRepoMock.Object);
            var extensionManager = new TrainingExtensionManager(trainingsMock, offersMock, uowMock.Object);
            

            var wfActivity = new Training();

            var proc = new WorkflowProcess(extensionManager, wfActivity);
            
            // Act
            var results = proc.Start();
            var firstOffer = new TrainingOffer() { Id = 1 };
            // Create an offer
            results = proc.Resume(Guid.Empty, TrainingStatus.Rfi, new RfiModel() { Offer = firstOffer });
            var firstOfferTest = results["Offer"];
            // Move to the next state
            results = proc.Resume(Guid.Empty, TrainingStatus.Rfi, new RfiModel() { Complete = true });
            
            results = proc.Resume(Guid.Empty, TrainingStatus.PlanInterview, new PlanInterviewModel() {InterviewPlan = new InterviewPlan()});

            // Add the interviews
            results = proc.Resume(Guid.Empty, TrainingStatus.Interview, new InterviewModel() {Interviews = new List<StudentInterview>() {new StudentInterview() {CreateDate = DateTimeOffset.UtcNow}}});

            results = proc.Resume(Guid.Empty, TrainingStatus.Offer, new OfferModel() {Complete = true});

            results = proc.Resume(Guid.Empty, TrainingStatus.Accepted,
                                  new AcceptedModel()
                                      {
                                          Schedule = new List<TrainingScheduleDay>() {new TrainingScheduleDay()}
                                      });

            proc.Resume(Guid.Empty, TrainingStatus.Planned, new PlannedModel());

            // proc.Resume(Guid.Empty, TrainingStatus.ProgressEvaluation,
            //             new ProgressEvaluationModel()
            //                 {
            //                     Evaluations = new List<ProgressEvaluation>() {new ProgressEvaluation()}
            //                 });

            // results = 
            // Assert

        }

    }
}
