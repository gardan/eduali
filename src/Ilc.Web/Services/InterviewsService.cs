using System.Linq;
using System.Net;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Web.Models;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class InterviewsService : Service
    {
        public IInterviewsService Interviews { get; set; }

        public FilteredDataModel<InterviewModel> Get(FilterParametersInterviews request)
        {
            var results = Interviews.GetFiltered(request);
            return new FilteredDataModel<InterviewModel>()
                {
                    Data = results.Data.Select(i => new InterviewModel().InjectFrom(i) as InterviewModel).ToList()
                };
        }

        public HttpResult Put(InterviewModel request)
        {
            var interview = Interviews.GetById(request.Id);
            interview.PopulateWithNonDefaultValues(request);

            Interviews.Update(interview);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class InterviewModel
    {
        public int Id { get; set; }

        public string ListeningLevel { get; set; }
        public string TargetListeningLevel { get; set; }

        public string ReadingLevel { get; set; }
        public string TargetReadingLevel { get; set; }

        public string InteractiveTalkingLevel { get; set; }
        public string TargetInteractiveTalkingLevel { get; set; }

        public string ProductiveTalkingLevel { get; set; }
        public string TargetProductiveTalkingLevel { get; set; }

        public string WritingLevel { get; set; }
        public string TargetWritingLevel { get; set; }
    }

    public class FilterParametersInterviews : FilterArgumentsInterviews
    {
        
    }
}