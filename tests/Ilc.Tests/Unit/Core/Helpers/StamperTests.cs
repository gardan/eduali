using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core.Contracts;
using Ilc.Core.Helpers;
using Ilc.Data.Models;
using Ilc.Data.Models.Base;
using Moq;
using NUnit.Framework;

namespace Ilc.Tests.Unit.Core.Helpers
{
    [TestFixture]
    public class StamperTests
    {
        [Test]
        public void StampingEntity_WithUserInfo_AssignsTheProperties()
        {
            // Arrange
            var usersService = new Mock<IUsersService>();
            usersService.Setup(u => u.GetByEmail()).Returns(new UserProfile() { Id = 1 });
            var stamper = new Stamper {Users = usersService.Object};
            var stampedEntity = new StampedEntity();

            // Act
            stamper.Stamp(stampedEntity);
            
            // Assert
            Assert.AreEqual(1, stampedEntity.Creator.Id);
        }
    }
}
