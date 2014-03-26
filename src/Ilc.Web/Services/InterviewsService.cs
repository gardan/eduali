using System.Collections.Generic;
using System.Linq;
using System.Net;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Web.Models;
using Ilc.Web.Services.Grading;
using Ilc.Web.Services.Tasks.Training;
using Omu.ValueInjecter;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class InterviewsService : Service
    {
        public IInterviewsService Interviews { get; set; }

        public FilteredDataModel<InterviewModel> Get(FilterParametersInterviews request)
        {
            //TODO: move to injector
            var results = Interviews.GetFiltered(request);
            var data = new List<InterviewModel>();
            foreach (var studentInterview in results.Data)
            {
                var interviewResults = new List<InterviewResultModel>();
                foreach (var interviewResult in studentInterview.InterviewResults)
                {
                    interviewResults.Add(new InterviewResultModel()
                        {
                            Id = interviewResult.Id,
                            GradingAttribute = new GradingAttributeModel()
                                {
                                    Id = interviewResult.GradingAttribute.Id,
                                    Name = interviewResult.GradingAttribute.Name
                                },
                            CurrentGrade = new GradeModel()
                                {
                                    Id = interviewResult.CurrentGrade.Id,
                                    Name = interviewResult.CurrentGrade.Name
                                },
                            TargetGrade = new GradeModel()
                                {
                                    Id = interviewResult.TargetGrade.Id,
                                    Name = interviewResult.TargetGrade.Name
                                }
                        });
                }

                data.Add(new InterviewModel()
                    {
                        Id = studentInterview.Id,
                        InterviewResults = interviewResults
                    });
            }

            return new FilteredDataModel<InterviewModel>()
                {
                    Data = data
                };
        }

        public HttpResult Put(UpdateInterviewModel request)
        {
            var interview = Interviews.GetById(request.Id);
            foreach (var createInterviewResultModel in request.InterviewResults)
            {
                var result = interview.InterviewResults.FirstOrDefault(r => r.GradingAttributeId == createInterviewResultModel.GradingAttributeId);
                result.TargetGradeId = createInterviewResultModel.TargetGradeId;
                result.CurrentGradeId = createInterviewResultModel.CurrentGradeId;
            }

            Interviews.Update(interview);

            return new HttpResult()
                {
                    StatusCode = HttpStatusCode.OK
                };
        }
    }

    public class UpdateInterviewModel
    {
        public int Id { get; set; }
        public List<CreateInterviewResultModel> InterviewResults { get; set; }
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

        public List<InterviewResultModel> InterviewResults { get; set; }
    }

    public class InterviewResultModel
    {
        public int Id { get; set; }
        public GradeModel CurrentGrade { get; set; }
        public GradeModel TargetGrade { get; set; }

        public GradingAttributeModel GradingAttribute { get; set; }
    }

    public class FilterParametersInterviews : FilterArgumentsInterviews
    {
        
    }
}