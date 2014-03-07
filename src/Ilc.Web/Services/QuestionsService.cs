using System.Collections.Generic;
using System.Linq;
using Ilc.Data.Contracts;
using Ilc.Web.Models;
using ServiceStack;

namespace Ilc.Web.Services
{
    public class QuestionsService : Service
    {
        public IUow Uow { get; set; }

        public FilteredDataModel<QuestionModel> Get(FilterParametersQuestions request)
        {
            var questions = Uow.Questions.GetAll().ToList();
            var data = new List<QuestionModel>();
            foreach (var question in questions)
            {
                var questionModel = new QuestionModel()
                    {
                        Id = question.Id,
                        Text = question.Text,
                        Type = question.Type
                    };

                if (question.Type == "radiogroup")
                {
                    questionModel.Answers = new List<RadioAnswerModel>();
                    foreach (var radioPossibleAnswer in question.Answers)
                    {
                        questionModel.Answers.Add(new RadioAnswerModel()
                            {
                                Text = radioPossibleAnswer.Text,
                                Id = radioPossibleAnswer.Id
                            });
                    }
                }


                data.Add(questionModel);
            }

            return new FilteredDataModel<QuestionModel>()
                {
                    Data = data
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