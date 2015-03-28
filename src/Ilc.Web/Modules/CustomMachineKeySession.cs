using System;
using System.Collections.Generic;
using System.IdentityModel.Services.Tokens;
using System.Linq;
using System.Web;

namespace Ilc.Web.Modules
{
    public class CustomMachineKeySession : MachineKeySessionSecurityTokenHandler
    {
        protected override byte[] ApplyTransforms(byte[] cookie, bool outbound)
        {
            byte[] numArray = cookie;
            if (this.Transforms == null)
            {
                // throw DiagnosticUtility.ExceptionUtility.ThrowHelperError(new InvalidOperationException(System.IdentityModel.SR.GetString("ID4296")));
            }
            if (!outbound)
            {
                for (int i = this.Transforms.Count; i > 0; i--)
                {
                    numArray = this.Transforms[i - 1].Decode(numArray);
                }
            }
            else
            {
                for (int j = 0; j < this.Transforms.Count; j++)
                {
                    numArray = this.Transforms[j].Encode(numArray);
                }
            }
            return numArray;
            return base.ApplyTransforms(cookie, outbound);
        }
    }
}