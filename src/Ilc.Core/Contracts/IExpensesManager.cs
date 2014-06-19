using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IExpensesManager
    {
        FilteredResults<Expense> GetFiltered (FilterArgumentsExpenses arguments);
    }
}