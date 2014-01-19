using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Core;
using Ilc.Data.Models;

namespace Ilc.Infrastructure.Contracts
{
    public interface IAvailabilityTemplatesService
    {
        List<Availability> GetAvailabilities(int templateId, DateTimeOffset startDate, DateTimeOffset endDate);
        FilteredResults<Template> GetFiltered(FilterArgumentsTemplates request);
        void Create(Template template);
        void Update(Template template);
        Template GetById(int id);
    }
}
