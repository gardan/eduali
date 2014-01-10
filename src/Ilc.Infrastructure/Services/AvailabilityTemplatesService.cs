using System;
using System.Collections.Generic;
using System.Linq;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Data.Contracts;
using Ilc.Data.Models;
using Ilc.Infrastructure.Contracts;
using Ilc.Misc;

namespace Ilc.Infrastructure.Services
{
    public class AvailabilityTemplatesService : IAvailabilityTemplatesService
    {
        public IUow Uow { get; set; }

        public IEnumerable<Availability> GetAvailabilities(int templateId, DateTimeOffset startDate, DateTimeOffset endDate)
        {
            Template template = Uow.Templates.GetById(templateId);

            // we have to iterate trough every day
            foreach (var day in TimeUtils.EachDay(startDate, endDate))
            {
                var templateDay = template.GetNextTemplateDay();

                if(templateDay.OffDay) continue;

                var startDateTmp = new DateTimeOffset(
                    day.Year, day.Month, day.Day,
                    templateDay.StartDate.Hour, templateDay.StartDate.Minute, 0, 0, TimeSpan.Zero);

                var span = new TimeSpan();
                if (templateDay.StartDate.Hour < templateDay.EndDate.Hour)
                {
                    span = templateDay.EndDate - templateDay.StartDate;
                }
                else if (templateDay.StartDate.Hour > templateDay.EndDate.Hour)
                {
                    span = templateDay.EndDate.AddDays(1) - templateDay.StartDate;
                }
                else if (templateDay.StartDate.Hour == templateDay.EndDate.Hour)
                {
                    span = new TimeSpan(1, 0, 0, 0);
                }

                var endDateTmp = startDateTmp.Add(span);

                var availability = new Availability()
                    {
                        StartDate = startDateTmp,
                        EndDate = endDateTmp
                    };
                yield return availability;
            }
        }

        public FilteredResults<Template> GetFiltered(FilterArgumentsTemplates parameters)
        {
            // set defaults
            parameters.Length = parameters.Length == 0 ? 10 : parameters.Length;
            parameters.Filter = parameters.Filter ?? new List<Filter>();

            var query = Uow.Templates.GetAll();
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

            return new FilteredResults<Template>()
            {
                Data = query.ToList(),
                TotalDisplayRecords = totalDisplayRecords,
                TotalRecords = totalDisplayRecords
            };
        }
    }



}