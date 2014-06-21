using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Core.Helpers;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class ExpensesService : Service
    {
        public IExpensesManager Expenses { get; set; }
        public IUow Uow { get; set; }
        public IStamper Stamper { get; set; }

        public FilteredDataModel<ExpenseModel> Get(FilterParametersExpenses request)
        {
            var results = Expenses.GetFiltered(request);
            var data = new List<ExpenseModel>();

            foreach (var expense in results.Data)
            {
                data.Add(new ExpenseModel()
                    {
                        Id = expense.Id,
                        Ammount = expense.Ammount,
                        ExpenseType = new ExpenseTypeModel().InjectFrom(expense.ExpenseType) as ExpenseTypeModel
                    });
            }

            return new FilteredDataModel<ExpenseModel>()
                {
                    Data = data,
                    TotalDisplayRecords = results.TotalDisplayRecords,
                    TotalRecords = results.TotalRecords
                };
        }


        public HttpResult Post(ExpenseModel request)
        {
            var expense = new Expense()
                {
                    Ammount = request.Ammount,
                    TrainingId = request.TrainingId
                };
            Stamper.Stamp(expense);

            Uow.Expenses.Add(expense);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.Created
                };
        }

        public HttpResult Put(ExpenseModel request)
        {
            var expense = Uow.Expenses.GetById(request.Id);
            expense.Ammount = request.Ammount;

            Uow.Expenses.Update(expense);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }

        public HttpResult Delete(ExpenseModel request)
        {
            Uow.Expenses.Delete(request.Id);
            Uow.Commit();

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    [Route("/expenses", Verbs = "POST")]
    [Route("/expenses/{id}", Verbs = "PUT, DELETE")]
    public class ExpenseModel
    {
        public int Id { get; set; }
        public decimal Ammount { get; set; }
        public ExpenseTypeModel ExpenseType { get; set; }
        public int TrainingId { get; set; }
    }

    [Route("/trainings/{trainingId}/expenses", Verbs = "GET")]
    public class FilterParametersExpenses : FilterArgumentsExpenses
    {

    }


}