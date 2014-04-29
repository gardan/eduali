using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Web.Services.DataImport;
using Moq;
using NUnit.Framework;

namespace Ilc.Tests.Unit.Web.Services
{
    [TestFixture]
    public class DataImportServiceTests
    {
        [Test]
        public void WhenImportingTrainer_ReturnOK()
        {
            // Arrange
            var service = new DataImportService();
            var uowMock = new Mock<IUow>();
            var subjectsMock = new Mock<IRepository<Subject>>();
            var trainerMock = new Mock<IRepository<Trainer>>();
            var userServiceMock = new Mock<IUsersService>();
            userServiceMock.Setup(u => u.GetByEmail()).Returns(new UserProfile() {CompanyId = 1});
            subjectsMock.Setup(t => t.GetAll()).Returns(new List<Subject>() {new Subject() {Id = 1, Name = "English"}}.AsQueryable);
            trainerMock.Setup(t => t.Update(It.IsAny<Trainer>()));
            uowMock.Setup(u => u.Subjects).Returns(subjectsMock.Object);
            uowMock.Setup(u => u.Trainers).Returns(trainerMock.Object);
            uowMock.Setup(u => u.Commit());
            service.Uow = uowMock.Object;
            service.Users = userServiceMock.Object;

            var data = new TrainerBulkImport[10];
            
            for (int i = 0; i < 10; i++)
            {
                data[i] = new TrainerBulkImport()
                    {
                        Email = "dan" + i + "@google.com",
                        FirstName = "alex",
                        LastName = "dan",
                        Birthday = DateTime.Parse("1991-05-04"),
                        Phone = "0745093950",
                        Subjects = "English"
                    };
            }

            // Act
            var result = service.Post(new ImportTrainersModel()
                {
                    Data = data
                });

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }

    }
}
