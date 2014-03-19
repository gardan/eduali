using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Text;
using System.Threading.Tasks;
using Ilc.Web.AppStart;
using Ilc.Web.Authentication.Contracts;
using Ilc.Web.Filters.Request;
using Ilc.Web.Services;
using Moq;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Testing;
using AuthenticationException = System.Security.Authentication.AuthenticationException;

namespace Ilc.Tests.Unit.Web
{
    [TestFixture]
    public class AuthenticationTests
    {
        private ServiceStackHost _appHost;

        [TestFixtureSetUp]
        public void SetUp()
        {
            _appHost = new AppHost().Init();
            _appHost.Container.RegisterAutoWired<ClientConfigurationService>();
        }

        [Test]
        public void WhenUnauthenticated_Returns401()
        {
            // Arrange
            var statusCode = 0;
            _appHost.Config.MapExceptionToStatusCode.TryGetValue(typeof(AuthenticationException), out statusCode);
            var ilcAuth = new IlcAuth();
            var req = new MockHttpRequest();
            var res = new MockHttpResponse();
            var authManagerMock = new Mock<IIdentityAuthenticationManager>();
            authManagerMock.Setup(a => a.IsAuthenticated()).Returns(false);
            ilcAuth.AuthManager = authManagerMock.Object;
            // Act
            Assert.Throws<AuthenticationException>(() => ilcAuth.Execute(req, res, new object()));

            // Assert
            Assert.AreEqual(401, statusCode);
        }

        [TestFixtureTearDown]
        public void TearDown()
        {
            _appHost.Dispose();
        }
    }
}
