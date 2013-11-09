using System;
using System.Collections.Generic;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;

namespace Ilc.Core.Services
{
    public class ClaimsService : IClaimsService
    {
        public IUow Uow { get; set; }

        public List<string> GetAll()
        {
            return SystemClaims.GetAll();
        }

        public List<string> GetByUserId(int userId)
        {
            var user = Uow.UserProfiles.GetById(userId);
            var roles = user.Roles;

            var claims = new List<string>();

            foreach (var role in roles)
            {
                claims.AddRange(role.Claims.Select(claim => claim.Name));
            }

            // strip the duplicate claims
            claims = claims.Distinct().ToList();

            return claims;
        }
    }
}