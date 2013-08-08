using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Core.Contracts;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack.ServiceInterface;
using ServiceStack.Text;

namespace Ilc.Web.Services
{
    public class GridConfigurationService : Service
    {

        public IGridConfigsService GridConfigs { get; set; }

        public FilteredDataModel<GridConfigModel> Get(GridConfigRequestParameters request)
        {
            var trainingsColumnsCfg = new 
                {
                    Status = new ColumnConfigurationModel()
                        {
                            Order = 0,
                            Hidden = false
                        },
                    Customer = new ColumnConfigurationModel()
                        {
                            Order = 1,
                            Hidden = false
                        },
                    Trainer = new ColumnConfigurationModel()
                        {
                            Order = 2,
                            Hidden = false
                        },
                    Subject = new ColumnConfigurationModel()
                        {
                            Order = 3,
                            Hidden = false
                        },
                    Owners = new ColumnConfigurationModel()
                        {
                            Order = 4,
                            Hidden = false
                        },
                };

            return new FilteredDataModel<GridConfigModel>()
                {
                    Data = GridConfigs.GetFiltered(request.Grid).Data.Select(cfg => new GridConfigModel().InjectFrom(cfg) as GridConfigModel).ToList()
                };
        }

    }
}