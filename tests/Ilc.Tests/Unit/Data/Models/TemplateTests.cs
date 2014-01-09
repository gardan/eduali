using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models;
using NUnit.Framework;

namespace Ilc.Tests.Unit.Data.Models
{
    [TestFixture]
    public class TemplateTests
    {
        [Test]
        public void GetNextTemplateDay_WithThreeDaysTemplate_ProperlyLoopsAroundEnd()
        {
            // Arrange
            var utcNow = DateTimeOffset.UtcNow;
            var template = new Template()
                {
                    TemplateDays = new List<TemplateDay>()
                        {
                            new TemplateDay() { StartDate = utcNow, EndDate = utcNow.AddHours(8) },
                            new TemplateDay() { StartDate = utcNow, EndDate = utcNow.AddHours(8) },
                            new TemplateDay() { OffDay = true }
                        }
                };

            // Act
            var templateDay = new TemplateDay();
            for (int i = 0; i < 6; i++)
            {
                templateDay = template.GetNextTemplateDay();
            }
            // Assert
            Assert.AreEqual(true, templateDay.OffDay);
        }
    }
}
