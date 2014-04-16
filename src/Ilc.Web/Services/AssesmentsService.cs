using System.Collections.Generic;
using System.Linq;
using Ilc.Core;
using Ilc.Core.Contracts;
using Ilc.Web.Models;
using Ilc.Web.Services.Grading;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class AssesmentsService : Service
    {
        public IAssesmentsManager AssesmentsManager { get; set; }

        public FilteredDataModel<AssesmentModel> Get(FilterParametersAssesments request)
        {
            var results = AssesmentsManager.GetFiltered(request);
            var data = new List<AssesmentModel>();

            foreach (var assesment in results.Data)
            {
                var assesmentsResults = new List<AssesmentResultModel>();
                foreach (var assesmentResult in assesment.AssesmentResults)
                {
                    assesmentsResults.Add(new AssesmentResultModel()
                        {
                            Id = assesmentResult.Id,
                            GradingAttribute = new GradingAttributeModel()
                            {
                                Id = assesmentResult.GradingAttribute.Id,
                                Name = assesmentResult.GradingAttribute.Name
                            },
                            CurrentGrade = new GradeModel()
                            {
                                Id = assesmentResult.CurrentGrade.Id,
                                Name = assesmentResult.CurrentGrade.Name
                            },
                            TargetGrade = new GradeModel()
                            {
                                Id = assesmentResult.TargetGrade.Id,
                                Name = assesmentResult.TargetGrade.Name
                            }
                        });
                }

                data.Add(new AssesmentModel()
                    {
                        Id = assesment.Id,
                        AssesmentResults = assesmentsResults
                    });
            }

            return new FilteredDataModel<AssesmentModel>()
                {
                    Data = data,
                    TotalDisplayRecords = results.TotalDisplayRecords,
                    TotalRecords = results.TotalRecords
                };
        }

    }

    public class FilterParametersAssesments : FilterArgumentsAssesments { }

    public class AssesmentModel
    {
        public int Id { get; set; }
        public List<AssesmentResultModel> AssesmentResults { get; set; }
    }

    public class AssesmentResultModel
    {
        public int Id { get; set; }
        public GradeModel CurrentGrade { get; set; }
        public GradeModel TargetGrade { get; set; }

        public GradingAttributeModel GradingAttribute { get; set; }
    }
}