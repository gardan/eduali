using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Web.Models;
using ServiceStack.ServiceInterface;
using ServiceStack.Text;

namespace Ilc.Web.Services
{
    public class GridConfigurationService : Service
    {

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
                    Data = new List<GridConfigModel>()
                        {
                            new GridConfigModel()
                                {
                                    ColumnConfig = JsonSerializer.SerializeToString(trainingsColumnsCfg), 
                                    Grid = "trainings"
                                }
                        },
                        TotalRecords = 1,
                        TotalDisplayRecords = 1
                };
        }

    }
}