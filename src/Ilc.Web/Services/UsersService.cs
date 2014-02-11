using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Data.Models.SimpleMembership;
using Ilc.Web.InjectorConventions;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class UsersService : Service
    {
        public IUsersService Users { get; set; }
        public IUow Uow { get; set; }

        public FilteredDataModel<UserModel> Get(FilterParametersUsers request)
        {
            var results = Users.GetFiltered(request);
            return new FilteredDataModel<UserModel>()
                {
                    Data = results.Data.Select(u => new UserModel().InjectFrom<UserProfileToUserModel>(u) as UserModel).ToList(),
                    TotalDisplayRecords = results.TotalDisplayRecords,
                    TotalRecords = results.TotalRecords
                }; 
        }

        public HttpResult Post(CreateUserModel request)
        {
            var roles = request.Roles.Select(roleModel => Uow.Roles.GetById(roleModel.Id)).ToList();

            var userProfile = new UserProfile()
                {
                    Email = request.UserInfo.Email,
                    Roles = roles,
                    UserDetails = new UserDetails().InjectFrom<UserInfoModelToUserDetails>(request.UserInfo) as UserDetails
                };

            Users.Create(userProfile, request.Password);

            var userModel = new UserModel().InjectFrom<UserProfileToUserModel>(userProfile) as UserModel;
            return new HttpResult(userModel)
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Put(UserModel request)
        {
            var userDetails = new UserDetails().InjectFrom<UserInfoModelToUserDetails>(request.UserInfo) as UserDetails;
            var user = Users.GetById(request.Id);
            user.Email = request.UserInfo.Email;
            user.UserDetails.PopulateWithNonDefaultValues(userDetails);

            Users.Update(user);

            return new HttpResult()
                {
                    StatusCode =  HttpStatusCode.OK
                };
        }

    }

    public class CreateUserModel
    {
        public string Username { get; set; }
        public RoleModel[] Roles { get; set; }

        public string Password { get; set; }

        public UserInfoModel UserInfo { get; set; }
    }


    public class UserModel
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public UserInfoModel UserInfo { get; set; }
    }

    public class FilterParametersUsers : FilterArgumentsUsers
    {
        
    }
}