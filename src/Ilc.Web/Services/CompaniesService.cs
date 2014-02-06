using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class CompaniesService : Service
    {
        public ICompaniesService Companies { get; set; }

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