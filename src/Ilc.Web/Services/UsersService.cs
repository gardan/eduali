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
                    Username = request.Username,
                    Roles = roles
                };

            Users.Create(userProfile, request.Password);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

    }

    public class CreateUserModel
    {
        public string Username { get; set; }
        public RoleModel[] Roles { get; set; }

        public string Password { get; set; }
    }


    public class UserModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public UserInfoModel UserInfo { get; set; }
    }

    public class FilterParametersUsers : FilterArguments
    {
        
    }
}