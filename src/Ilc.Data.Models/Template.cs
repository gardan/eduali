using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ilc.Data.Models.Base;

namespace Ilc.Data.Models
{
    public class Template : StampedEntity
    {
        public string Name { get; set; }

        public virtual ICollection<TemplateDay> TemplateDays { get; set; }

        private int _currentDayIndex = -1;
        public TemplateDay GetNextTemplateDay()
        {
            // we are at the beggining
            if (_currentDayIndex == -1)
            {
                _currentDayIndex = 1;
                return TemplateDays.ToList()[0];
            }

            TemplateDay ret;
            // we are at the end, need to reset the index
            if (_currentDayIndex == TemplateDays.Count() - 1)
            {
                ret = TemplateDays.ToList()[_currentDayIndex];
                _currentDayIndex = 0;
                return ret;
            }
            ret = TemplateDays.ToList()[_currentDayIndex];
            _currentDayIndex++;
            return ret;
        }
    }
}
