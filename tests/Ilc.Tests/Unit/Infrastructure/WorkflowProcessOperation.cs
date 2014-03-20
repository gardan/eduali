using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Infrastructure;
using Ilc.Infrastructure.Workflows;
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
            var schedule = new List<TrainingScheduleDay>() { new TrainingScheduleDay() };
            var user = new UserProfile() { Id = 1 };
            var training = new Ilc.Data.Models.Training() { Owners = new List<UserProfile>()  { user } };
            var ownerConfig = new TrainingOwnersConfiguration() {AdministrationId = 1, CoordinatorId = 1, SalesId = 1};
            var firstOffer = new TrainingOffer() { Id = 1, NoLessons = 1 };
            training.Students = new List<Student>()
                {
                    new Student() { UserProfile = user },
                };
            training.TrainingEvaluations = new List<TrainingEvaluation>()
                {
                    new TrainingEvaluation()
                };

            var trainingsMock = new Mock<ITrainingsService>();
            trainingsMock.Setup(m => m.GetById(It.IsAny<int>())).Returns(training);
            var offersMock = new Mock<IOffersService>().Object;
            var offersRepoMock = new Mock<IRepository<TrainingOffer>>();
            offersRepoMock.Setup(r => r.GetById(It.IsAny<int>())).Returns(firstOffer);
            var interviewPlanRepoMock = new Mock<IRepository<InterviewPlan>>();
            var interviewRepoMock = new Mock<IRepository<StudentInterview>>();
            var scheduleRepoMock = new Mock<IRepository<TrainingScheduleDay>>(); 
            var progressEvalRepoMock = new Mock<IRepository<ProgressEvaluation>>();
            var trainingEvalRepoMock = new Mock<IRepository<TrainingEvaluation>>();
            var trainingRepoMock = new Mock<IRepository<Ilc.Data.Models.Training>>();
            var userProfileRepoMock = new Mock<IUserProfileRepository>();
            var ownerConfigRepoMock = new Mock<IRepository<TrainingOwnersConfiguration>>();
            ownerConfigRepoMock.Setup(r => r.GetById(It.IsAny<int>())).Returns(ownerConfig);
            userProfileRepoMock.Setup(r => r.GetById(It.IsAny<int>())).Returns(user);
            trainingRepoMock.Setup(r => r.GetById(It.IsAny<int>())).Returns(training);
            var uowMock = new Mock<IUow>();
            uowMock.Setup(uow => uow.InterviewPlans).Returns(interviewPlanRepoMock.Object);
            uowMock.Setup(uow => uow.Interviews).Returns(interviewRepoMock.Object);
            uowMock.Setup(uow => uow.TrainingScheduleDays).Returns(scheduleRepoMock.Object);
            uowMock.Setup(uow => uow.ProgressEvaluations).Returns(progressEvalRepoMock.Object);
            uowMock.Setup(uow => uow.TrainingEvaluations).Returns(trainingEvalRepoMock.Object);
            uowMock.Setup(uow => uow.Offers).Returns(offersRepoMock.Object);
            uowMock.Setup(uow => uow.Trainings).Returns(trainingRepoMock.Object);
            uowMock.Setup(uow => uow.UserProfiles).Returns(userProfileRepoMock.Object);
            uowMock.Setup(uow => uow.TrainingOwnersConfiguration).Returns(ownerConfigRepoMock.Object);
            var extensionManager = new TrainingExtensionManager(trainingsMock.Object, offersMock, uowMock.Object);
            

            var wfActivity = new Training();

            var proc = new WorkflowProcess(extensionManager, wfActivity);
            
            // Act
             proc.Start();
            
            // Create an offer
            var results = proc.Resume(Guid.Empty, TrainingStatus.Rfi, new Dictionary<string, object>()
                {
                    { "Offer", firstOffer },
                });
            
            results = proc.Resume(Guid.Empty, TrainingStatus.Rfi, new Dictionary<string, object>()
                {
                    { "OfferId", 1 },
                });
            // Move to the next state           
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
                    { "Complete", true },
                    { "OfferId", 1 }
                });


            
            results = proc.Resume(Guid.Empty, TrainingStatus.Accepted, new Dictionary<string, object>()
                {
                    { "Schedule", schedule }
                });

            results = proc.Resume(Guid.Empty, TrainingStatus.Accepted, new Dictionary<string, object>()
                {
                    { "Schedule", null }
                });
                                  

            proc.Resume(Guid.Empty, TrainingStatus.Planned, new Dictionary<string, object>());

            var progressEval = new ProgressEvaluation();
            proc.Resume(Guid.Empty, TrainingStatus.ProgressEvaluation, new Dictionary<string, object>()
                {
                    { "ProgressEvaluation", progressEval }
                });

            // Move to next state
            proc.Resume(Guid.Empty, TrainingStatus.ProgressEvaluation, new Dictionary<string, object>());

            var trainingEval = new TrainingEvaluation();
            proc.Resume(Guid.Empty, TrainingStatus.TrainingEvaluation, new Dictionary<string, object>()
                {
                    { "TrainingEvaluation", trainingEval },
                    { "TrainingId", 1 }
                });
            training.TrainingEvaluations.Add(new TrainingEvaluation());

            // Move to next step
            // results = proc.Resume(Guid.Empty, TrainingStatus.TrainingEvaluation, new Dictionary<string, object>()
            //     {
            //         { "TrainingId", 1 }
            //     });


            // Assert
            var workflowComplete = (bool)results["Complete"];
            Assert.True(workflowComplete);
        }

    }
}
