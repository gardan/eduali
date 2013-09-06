using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ilc.Web.Models.Student
{
    public class TrainingStudentInterviewModel
    {
        /// <summary>
        /// This is used as incoming and outgoing.
        /// When incoming it represents the TrainingId.
        /// And when outgoing the Id of the Student.
        /// </summary>
        public int Id { get; set; }
        public string Name { get; set; }
        public int InterviewId { get; set; }

        public int ProgressEvaluationId { get; set; }
    }
}