using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Data.Contracts;
using Ilc.Web.Models;

namespace Ilc.Web.Services
{
    public class TasksService
    {
        public IUow Uow { get; set; }

        public FilteredDataModel<TaskModel> Get(FilterParametersTasks request)
        {
            var trainings = Uow.Trainings.GetAll();

            return null;

        }
    }

    public class TaskModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Action { get; set; }
    }

    public class FilterParametersTasks : FilterParametersBase
    {

    }
}