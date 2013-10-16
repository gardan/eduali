using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class UsersService : Service
    {
        public IUsersService Users { get; set; }

        public FilteredDataModel<UserModel> Get(FilterParametersUsers request)
        {
            var results = Users.GetFiltered(request);
            return new FilteredDataModel<UserModel>()
                {
                    Data = results.Data.Select(u => new UserModel().InjectFrom(u) as UserModel).ToList(),
                    TotalDisplayRecords = results.TotalDisplayRecords,
                    TotalRecords = results.TotalRecords
                }; 
        }

    }


    public class UserModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
    }

    public class FilterParametersUsers : FilterArguments
    {
        
    }
}