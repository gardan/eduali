using System;
using System.Linq;
using System.Net;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Models;
using Ilc.Web.Authentication.Contracts;
using Ilc.Web.Filters.Request;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class CompaniesService : Service
    {
        public ICompaniesService Companies { get; set; }
        public IIdentityAuthenticationManager AuthenticationManager { get; set; }

        [IlcAuth]
        public FilteredDataModel<CompanyModel> Get(FilterParametersCompanies request)
        {
            var data = Companies.GetFiltered(request);

            return new FilteredDataModel<CompanyModel>()
                {
                    Data = data.Data.Select(c => new CompanyModel().InjectFrom(c) as CompanyModel).ToList(),
                    TotalDisplayRecords = data.TotalDisplayRecords,
                    TotalRecords = data.TotalRecords
                };
        }

        public HttpResult Post(CreateCompanyModel request)
        {
            var company = new Company().InjectFrom(request) as Company;
            var userProfile = new UserProfile()
                {
                    Email = request.UserInfo.Email,
                    UserDetails = new UserDetails().InjectFrom(request.UserInfo) as UserDetails,
                };

            Companies.Create(company, userProfile, request.Password);
            if (!AuthenticationManager.IsAuthenticated())
            {
                AuthenticationManager.CheckPasswordAndSignIn(request.UserInfo.Email, request.Password, true);
            }           

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        [IlcAuth]
        public HttpResult Put(CompanyModel request)
        {
            var company = Companies.GetById(request.Id);
            company.Name = request.Name;

            Companies.Update(company);

            return new HttpResult()
                {
                    StatusCode =  HttpStatusCode.OK
                };
        }
    }

    public class CreateCompanyModel
    {
        public string Name { get; set; }
        public UserInfoModel UserInfo { get; set; }
        public string Password { get; set; }
    }

    public class FilterParametersCompanies : FilterArguments
    {

    }

    public class CompanyModel   
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}