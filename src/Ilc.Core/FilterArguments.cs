using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ilc.Core
{
    public class FilterArguments
    {
        public FilterArguments()
        {
            Filter = new List<Filter>();
        }

        public int Limit {
            get { return this.Length; }
            set { this.Length = value; }
        }

        /// <summary>
        /// Collection of the filters
        /// </summary>
        public List<Filter> Filter { get; set; }

        /// <summary>
        /// Starting index of the data set
        /// </summary>
        public int StartIndex { get; set; }
        /// <summary>
        /// Record to return
        /// </summary>
        public int Length { get; set; }
        /// <summary>
        /// Columns beeing displayed
        /// </summary>
        public int VisibleColumns { get; set; }
        /// <summary>
        /// Search query
        /// </summary>
        public string Search { get; set; }
        /// <summary>
        /// True if the search query should be treated as a regex
        /// </summary>
        public bool IsRegex { get; set; }
        /// <summary>
        /// Int array of the searchable columns defined in <see cref="DataProperties" />
        /// </summary>
        public bool[] Searchable { get; set; }
        /// <summary>
        /// String array of search term for individual columns defined in <see cref="DataProperties" />
        /// </summary>
        public string[] SearchColumns { get; set; }
        /// <summary>
        /// Bool array indicating if any individual search term should be treated as a regex
        /// </summary>
        public bool[] RegexColumn { get; set; }
        /// <summary>
        /// Bool aray indicating if an individual column is marked as sortable or not.
        /// </summary>
        public bool[] SortableColumns { get; set; }
        /// <summary>
        /// How many columns to sort on
        /// </summary>
        public int TotalSortingColumns { get; set; }
        /// <summary>
        /// Int array representing wich column should we sort on
        /// </summary>
        public int[] SortingColumns { get; set; }
        /// <summary>
        /// String array representing the sort direction of the columns beeing sorted. 'asc' | 'desc'
        /// </summary>
        public string[] SortDirection { get; set; }
        /// <summary>
        /// String array containing property names, to ensure independent processing from the order of the columns.
        /// </summary>
        public string[] DataProperties { get; set; }
    }

    /// <summary>
    /// This class holds the filter information from senchas grid filtering capabilities
    /// </summary>
    public class Filter
    {
        public string Type { get; set; }
        public string Value { get; set; }
        public string Field { get; set; }
    }
}
