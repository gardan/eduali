using Ilc.Data.Models;

namespace Ilc.Core.Contracts
{
    public interface IInterviewsService
    {
        FilteredResults<StudentInterview> GetFiltered(FilterArgumentsInterviews arguments);
    }
}
