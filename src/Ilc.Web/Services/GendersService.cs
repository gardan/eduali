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
    public class GendersService : Service
    {

        public IGenderService Genders { get; set; }

        public FilteredDataModel<GenderModel> Get(FilterParametersGenders request)
        {
            return new FilteredDataModel<GenderModel>()
                {
                    Data = new List<GenderModel>(Genders.GetAll().Select(g => new GenderModel().InjectFrom(g) as GenderModel)) 
                };
        }

    }

    public class FilterParametersGenders : FilterArguments
    {

    }

    public class GenderModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}