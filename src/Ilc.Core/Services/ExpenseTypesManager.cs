﻿using System.Collections.Generic;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class ExpenseTypesManager : IExpenseTypesManager
    {
        public IUsersService Users { get; set; }
        public IUow Uow { get; set; }

        public FilteredResults<ExpenseType> GetFiltered(FilterArgumentsExpenseTypes parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            parameters.Filter = parameters.Filter ?? new List<Filter>();

            var user = Users.GetByEmail();
            var query = Uow.ExpenseTypes.GetAll().Where(et => et.CompanyId == user.CompanyId);

            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

            // search
            foreach (var filter in parameters.Filter)
            {
                var inFilter = filter;
                switch (filter.Field)
                {
                    case "name":
                        query = query.Where(c => c.Name.Contains(inFilter.Value));
                        break;
                    default:
                        // if trying to search for unavailable column, just exit
                        // TODO: log this shit.
                        break;
                }
            }

            // order
            query = query.OrderBy(e => e.Id);

            // paging
            query = query.Skip(parameters.StartIndex).Take(parameters.Length);

            return new FilteredResults<ExpenseType>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = totalDisplayRecords,
                TotalRecords = totalDisplayRecords
            };
        }

        public void Create(ExpenseType expenseType)
        {
            var user = Users.GetByEmail();
            expenseType.CompanyId = user.CompanyId;

            Uow.ExpenseTypes.Add(expenseType);
            Uow.Commit();
        }
    }
}