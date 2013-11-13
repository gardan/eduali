using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;

namespace Ilc.Tests.Unit.Misc
{
    [TestFixture]
    public class UtilsTests
    {

        [Test]
        public void RandomHex_WithSixLength_SixChars()
        {
            var test = Ilc.Misc.Utils.GetRandomHexString(6);

            Assert.AreEqual(6, test.Length);
        }
    }
}
