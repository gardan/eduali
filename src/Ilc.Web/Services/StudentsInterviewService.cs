using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Web.Models;
using Ilc.Web.Models.Student;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class StudentsInterviewService : Service
    {

        public FilteredDataModel<TrainingStudentInterviewModel> Get(TrainingStudentInterviewModel request)
        {
            return new FilteredDataModel<TrainingStudentInterviewModel>()
                {
                    Data = new List<TrainingStudentInterviewModel>()
                        {
                            new TrainingStudentInterviewModel()
                                {
                                    Id = 1,
                                    InterviewId = 1,
                                    Name = "Gheo Ion"
                                }
                        }
                };
        }

    }
}