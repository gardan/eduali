﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Web.Configuration;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;
using Ilc.Helpers;
using Ilc.Misc;

namespace Ilc.Core.Services
{
    public class UsersService : IUsersService
    {
        public IUow Uow { get; set; }
        public IUserNotifyService NotifyService { get; set; }   

        public FilteredResults<UserProfile> GetFiltered(FilterArgumentsUsers parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            parameters.Filter = parameters.Filter ?? new List<Filter>();

            var user = GetByEmail();
            var query = Uow.UserProfiles.GetAll().Where(up => up.CompanyId == user.CompanyId);
            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

            // filter by claims
            if (!string.IsNullOrEmpty(parameters.Claims))
            {
                var roles = Uow.Roles.GetRolesByClaims(parameters.Claims.Split(",".ToCharArray()));
                var roleIds = roles.Select(r => r.Id);
                query = query.Where(u => u.Roles.Any(r => roleIds.Contains(r.RoleId)));
            }

            // search
            foreach (var filter in parameters.Filter)
            {
                var inFilter = filter;
                switch (filter.Field)
                {
                    case "email":
                        query = query.Where(c => c.Email.Contains(inFilter.Value));
                        break;
                    default:
                        // if trying to search for unavalable column, just exit
                        // TODO: log this shit.
                        break;
                }
            }

            // order
            query = query.OrderBy(e => e.Id);

            // paging
            query = query.Skip(parameters.StartIndex).Take(parameters.Length);

            return new FilteredResults<UserProfile>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = totalDisplayRecords,
                TotalRecords = totalDisplayRecords
            };
        }

        public UserProfile GetByEmail(string username)
        {
            return Uow.UserProfiles.GetAll().FirstOrDefault(u => u.Email == username);
        }

        public UserProfile GetByEmail()
        {
            var principal = ClaimsPrincipal.Current;
            return GetByEmail(principal.FindFirst(c => c.Type == ClaimTypes.Name).Value);
        }

        public UserProfile GetById(int id)
        {
            return Uow.UserProfiles.GetById(id);
        }

        public void Create(UserProfile user, string password)
        {
            if (user.CompanyId == 0)
            {
                var loggedInUser = GetByEmail();
                user.CompanyId = loggedInUser.CompanyId;
            }

            // Create the profile
            Uow.UserProfiles.Add(user);
            Uow.Commit();

            // Create the membership
            var salt = Crypto.Crypto.GenerateSalt();
            var hashedPwd = "";
            var token = "";
            DateTime? tokenExpirationDate = null;
            
            if (password != "")
            {
                hashedPwd = GetHashedFromPlain(password, salt);
            }
            else
            {
                var buffer = new byte[20];
                StaticRandom.NextBytes(buffer);
                GetHashedFromPlain(Encoding.UTF8.GetString(buffer), salt);

                token = Guid.NewGuid().ToString();
                tokenExpirationDate = DateTime.UtcNow.AddDays(1);
            }

            Uow.Memberships.Add(new Membership()
                {
                    UserId = user.Id,
                    PasswordFailuresSinceLastSuccess = 0,
                    Password = hashedPwd,
                    PasswordSalt = salt,
                    PasswordVerificationToken = token,
                    PasswordVerificationTokenExpirationDate = tokenExpirationDate
                });
            Uow.Commit();
            
            if (password == "")
            {
                var appUrl = WebConfigurationManager.AppSettings["ApplicationUrl"];
                var body = Templates.CreatedAccountWithNoPassword(new
                    {
                        InitPasswordUrl = string.Format("{0}/#initaccount?token={1}", appUrl, token)                    
                    });
                
                NotifyService.Notify(user.Email, body);
            }
        }

        public void Update(UserProfile user)
        {
            Uow.UserProfiles.Update(user);
            Uow.Commit();
        }

        public void UpdatePassword(int userId, string password)
        {
            var salt = Crypto.Crypto.GenerateSalt();
            var membership = Uow.Memberships.GetById(userId);
            membership.PasswordSalt = salt;
            membership.Password = GetHashedFromPlain(password, salt);
            membership.PasswordChangedDate = DateTime.UtcNow;

            Uow.Memberships.Update(membership);
            Uow.Commit();
        }

        private string GetHashedFromPlain(string text, string salt)
        {
            return Crypto.Crypto.Hash(salt + Crypto.Crypto.Hash(salt + text));
        }
    }
}
