using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class ExpenseTypesService : Service
    {
        public IUow Uow { get; set; }
        public IExpenseTypesManager ExpenseTypes { get; set; }

        public FilteredDataModel<ExpenseTypeModel> Get(FilterParametersExpenseTypes request)
        {
            var result = ExpenseTypes.GetFiltered(request);

            return new FilteredDataModel<ExpenseTypeModel>()
                {
                    Data = result.Data.Select(et => new ExpenseTypeModel().InjectFrom(et) as ExpenseTypeModel).ToList(),
                    TotalDisplayRecords = result.TotalDisplayRecords,
                    TotalRecords = result.TotalRecords
                };
        }

        public HttpResult Post(ExpenseTypeModel request)
        {
            var expenseType = new ExpenseType()
                {
                    Name = request.Name
                };

            ExpenseTypes.Create(expenseType);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.Created
                };
        }


        public HttpResult Put(ExpenseTypeModel request)
        {
            var expenseType = Uow.ExpenseTypes.GetById(request.Id);
            expenseType.Name = request.Name;

            Uow.ExpenseTypes.Update(expenseType);
            Uow.Commit();

            return new HttpResult()
            {
                StatusCode = HttpStatusCode.OK
            };
        }

        public HttpResult Delete(ExpenseTypeModel request)
        {
            Uow.ExpenseTypes.Delete(request.Id);
            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

    }


    public class FilterParametersExpenseTypes : FilterArgumentsExpenseTypes
    {
    }

    public class ExpenseTypeModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}