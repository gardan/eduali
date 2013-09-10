using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ilc.Web.Models;
using ServiceStack.ServiceInterface;

namespace Ilc.Web.Services
{
    public class QuestionsService : Service
    {

        public FilteredDataModel<QuestionModel> Get(FilterParametersQuestions request)
        {
            return new FilteredDataModel<QuestionModel>()
                {
                    Data = new List<QuestionModel>()
                        {
                            new QuestionModel() { Id = 1, Text = "Question Nr. 1?", Type = "string" },
                            new QuestionModel() { Id = 2, Text = "Pick one", Type = "radiogroup", Answers = new List<RadioAnswerModel>()
                                {
                                    new RadioAnswerModel() { Id = 1, Text = "Option 1" },
                                    new RadioAnswerModel() { Id = 2, Text = "Option 2" }
                                }},
                            new QuestionModel() { Id = 3, Text = "Do you accept?", Type = "checkbox" }
                            
                        }
                };
        }
    }

    public class QuestionModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Type { get; set; }
        public List<RadioAnswerModel> Answers { get; set; }
    }

    public class RadioAnswerModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }

    public class FilterParametersQuestions : FilterParametersBase
    {

    }
}