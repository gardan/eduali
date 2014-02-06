﻿using System;
using System.Collections.Generic;
using System.Linq;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class CompaniesService : ICompaniesService
    {
        public IUow Uow { get; set; }

        public FilteredResults<Company> GetFiltered(FilterArguments parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            parameters.Filter = parameters.Filter ?? new List<Filter>();

            var query = Uow.Companies.GetAll();
            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

            // search
            foreach (var filter in parameters.Filter)
            {
                var inFilter = filter;
                switch (filter.Field)
                {
                    case "id":
                        var id = Convert.ToInt32(inFilter.Value);
                        query = query.Where(c => c.Id == id);
                        break;
                    case "name":
                        query = query.Where(c => c.Name.Contains(inFilter.Value));
                        break;
                    default:
                        // if trying to search for unavalable column, just exit
                        // TODO: log this shit.
                        break;
                }
            }

            // order
            query = query.OrderBy(e => e.Id);

            // paging
            query = query.Skip(parameters.StartIndex).Take(parameters.Length);

            return new FilteredResults<Company>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = totalDisplayRecords,
                TotalRecords = totalDisplayRecords
            };
        }
    }
}