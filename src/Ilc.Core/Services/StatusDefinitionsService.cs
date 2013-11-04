using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;

namespace Ilc.Core.Services
{
    public class StatusDefinitionsService : IStatusDefinitionsService
    {
        public IUow Uow { get; set; }

        public FilteredResults<StatusDictionary> GetFiltered(FilterArgumentsStatusDefinitions parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            parameters.Filter = parameters.Filter ?? new List<Filter>();

            var query = Uow.StatusDictionary.GetAll();

            var totalResults = query.Count();
            var totalDisplayRecords = totalResults;

            // search
            foreach (var filter in parameters.Filter)
            {
                //var inFilter = filter;
                //switch (filter.Field)
                //{
                //    case "name":
                //        query = query.Where(c => c.Name.Contains(inFilter.Value));
                //        break;
                //    default:
                //        // if trying to search for unavalable column, just exit
                //        // TODO: log this shit.
                //        break;
                //}
            }

            // order
            query = query.OrderBy(e => e.Id);

            // paging
            query = query.Skip(parameters.StartIndex).Take(parameters.Length);

            return new FilteredResults<StatusDictionary>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = totalDisplayRecords,
                TotalRecords = totalDisplayRecords
            };
        }

        public StatusDictionary GetById(int id)
        {
            return Uow.StatusDictionary.GetById(id);
        }

        public void Update(StatusDictionary status)
        {
            Uow.StatusDictionary.Update(status);
            Uow.Commit();
        }
    }
}
