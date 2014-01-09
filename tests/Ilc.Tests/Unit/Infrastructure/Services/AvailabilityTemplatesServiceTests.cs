using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Infrastructure.Services;
using Moq;
using NUnit.Framework;

namespace Ilc.Tests.Unit.Infrastructure.Services
{
    [TestFixture]
    public class AvailabilityTemplatesServiceTests
    {
        [Test]
        public void GetAvailabilities_WithThreeDayTemplate_ReturnsAvailabilities()
        {
            // Arrange
            var utcNow = DateTimeOffset.UtcNow;
            var template = new Template()
            {
                TemplateDays = new List<TemplateDay>()
                        {
                            new TemplateDay() { StartDate = new DateTimeOffset(1, 1, 1, 8, 0, 0, 0, TimeSpan.Zero), EndDate = new DateTimeOffset(1, 1, 1, 16, 0, 0, 0, TimeSpan.Zero) },
                            new TemplateDay() { StartDate = new DateTimeOffset(1, 1, 1, 8, 0, 0, 0, TimeSpan.Zero), EndDate = new DateTimeOffset(1, 1, 1, 16, 0, 0, 0, TimeSpan.Zero) },
                            new TemplateDay() { OffDay = true }
                        }
            };
            var availabilityService = new AvailabilityTemplatesService();
            var uowMock = new Mock<IUow>();
            var templatesRepoMock = new Mock<IRepository<Template>>();
            templatesRepoMock.Setup(repo => repo.GetById(It.IsAny<int>())).Returns(template);
            uowMock.Setup(u => u.Templates).Returns(templatesRepoMock.Object);
            availabilityService.Uow = uowMock.Object;

            // Act
            var availabilities = availabilityService.GetAvailabilities(1, new DateTimeOffset(2012, 1, 1, 8, 0, 0, 0, TimeSpan.Zero),
                                                                       new DateTimeOffset(2012, 1, 17, 8, 0, 0, 0, TimeSpan.Zero)).ToList();
            // Assert
            Assert.AreEqual(new DateTimeOffset(2012, 1, 1, 8, 0, 0, 0, TimeSpan.Zero), availabilities[0].StartDate);
            Assert.AreEqual(new DateTimeOffset(2012, 1, 1, 16, 0, 0, 0, TimeSpan.Zero), availabilities[0].EndDate);

            // Assert is checking if the DayOff template day is working.
            Assert.AreEqual(new DateTimeOffset(2012, 1, 4, 8, 0, 0, 0, TimeSpan.Zero), availabilities[2].StartDate);
            Assert.AreEqual(new DateTimeOffset(2012, 1, 4, 16, 0, 0, 0, TimeSpan.Zero), availabilities[2].EndDate);
        }
    }
}
